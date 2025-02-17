import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/api/entities/user.entity';
import { UserStatus } from 'src/api/enums/user-status.enum';
import { DataSource, Repository } from 'typeorm';
import { GetCompaniesUsersDto } from '../../admin/companies/dto/get-companies-users.dto';
import { UpdateUserDto } from '../../admin/companies/dto/update-user.dto';
import { EmailService } from 'src/api/email/email.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetCompaniesUsersResponseDto } from '../../admin/companies/dto/get-companies-users-response.dto';
import { GetCompaniesUserResponseDto } from '../../admin/companies/dto/get-companies-user.response.dto';
import { MessageResponseDto } from '../../responses/message-response.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly dataSource: DataSource,
  ) {
    super(User, dataSource.createEntityManager());
  }

  /* -------- PRIVATE METHODS ---------- */

  // method to verify email
  private async verifyEmail(
    userId: string,
    email: string,
    randomPassword?: string,
  ): Promise<boolean> {
    const jwtPayload = { userId: userId, expireIn: '3600' };
    const verifyUrl = `${process.env.BASE_URL}admin/auth/email?jwtToken=${encodeURIComponent(this.jwtService.sign(jwtPayload))}`;
    const emailSent = await this.emailService.authEmail(
      email,
      verifyUrl,
      randomPassword || '',
    );
    if (!emailSent) {
      throw new HttpException(
        {
          success: false,
          message: 'Verification email was not send',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }

  // method to generate random string (password)
  private async generateRandomPassword(length: number = 8): Promise<{
    password: string;
  }> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password: string = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return { password };
  }

  /* -------------- PUBLIC METHODS --------------- */

  // method to list all users
  async getCompaniesUsers(
    companyId: string,
    getCompaniesUsersDto: GetCompaniesUsersDto,
  ): Promise<GetCompaniesUsersResponseDto> {
    const {
      searchQuery,
      limit,
      offset,
      status,
      role,
      initialPassword,
      emailVerified,
    } = getCompaniesUsersDto;
    const query = this.createQueryBuilder('user');

    const numLimit = Number(limit);
    const numOffset = Number(offset);

    // Validate limit and offset
    if (isNaN(numLimit) || numLimit <= 0) {
      throw new Error('Limit must be a positive number');
    }
    if (isNaN(numOffset) || numOffset < 0) {
      throw new Error('Offset must be a non-negative number');
    }

    query.where('(user.company_id  = :companyId)', { companyId });
    query.andWhere('(user.status != :status )', { status: UserStatus.DELETED });

    if (searchQuery) {
      query.andWhere(
        '(user.name LIKE :searchQuery OR user.email LIKE :searchQuery OR user.phone_number LIKE :searchQuery)',
        { searchQuery: `%${searchQuery}%` },
      );
    }

    if (status) {
      query.andWhere('(user.status = :status)', { status });
    }

    if (role) {
      query.andWhere('(user.role = :role) ', { role });
    }

    if (initialPassword) {
      query.andWhere('(user.initial_password = :initial_password) ', {
        initialPassword,
      });
    }

    if (emailVerified) {
      query.andWhere('(user.email_verified = :email_verified)', {
        emailVerified,
      });
    }
    query.skip(numOffset);
    query.take(numLimit);

    const [companiesUsers, totalRecords] = await query.getManyAndCount();

    const result = companiesUsers.map(
      ({
        id,
        name,
        email,
        phoneNumberPrefix,
        phoneNumber,
        emailVerified,
        role,
        status,
      }) => ({
        id: id ?? '/',
        name: name ?? '/',
        email: email ?? '/',
        phoneNumberPrefix: phoneNumberPrefix ?? '/',
        phoneNumber: phoneNumber ?? '/',
        emailVerified: emailVerified,
        role: role,
        status: status,
      }),
    );
    const totalPages = Math.ceil(totalRecords / numLimit);
    const currentPage = Math.floor(numOffset / numLimit) + 1;
    return {
      result,
      totalRecords,
      totalPages,
      currentPage,
      limit: numLimit,
      offset: numOffset,
    };
  }

  // method to show single user data
  async getCompaniesUser(
    companyId: string,
    userId: string,
  ): Promise<GetCompaniesUserResponseDto> {
    const userData = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .where('(user.id = :userId AND company.id = :companyId )', {
        userId,
        companyId,
      })
      .getOne();

    if (!userData) {
      throw new NotFoundException(
        'User with this ID does not exist in provided Company.',
      );
    }

    return {
      name: userData.name ?? '-',
      id: userData.id,
      email: userData.email ?? '-',
      phoneNumberPrefix: userData.phoneNumberPrefix ?? '-',
      phoneNumber: userData.phoneNumber ?? '-',
      emailVerified: userData.emailVerified ?? false,
      role: userData.role,
      status: userData.status,
    };
  }

  // method to update single user
  async updateUser(
    companyId: string,
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{
    message: string;
  }> {
    const { name, email, phoneNumberPrefix, phoneNumber, role } = updateUserDto;

    const userData = await this.findOne({
      where: { id: userId },
    });

    if (!userData) {
      throw new NotFoundException('User with this ID does not exist.');
    }

    if (name && userData.id != userId) {
      userData.name = name;
    }

    if (email) {
      const exist = await this.findOne({ where: { email } });
      if (exist && exist.id != userId) {
        throw new ConflictException('User with this email already exist.');
      }
      userData.email = email;
      await this.verifyEmail(userId, email);
      userData.emailVerified = false;
    }

    if (phoneNumber) {
      const existPhone = await this.findOne({
        where: { phoneNumber },
      });

      if (existPhone && existPhone.id != userId) {
        throw new ConflictException(
          'User with this phone number already exist.',
        );
      }
      userData.phoneNumberPrefix = phoneNumberPrefix;
      userData.phoneNumber = phoneNumber;
    }

    if (role) {
      userData.role = role;
    }

    await this.save(userData);

    return {
      message: 'User is updated successfully.',
    };
  }

  // method to delete single user
  async deleteUser(
    companyId: string,
    userId: string,
  ): Promise<{
    message: string;
  }> {
    const user = await this.findOne({
      where: { id: userId, company: { id: companyId } },
    });

    if (!user) {
      throw new NotFoundException('User with this ID does not exist.');
    }

    user.status = UserStatus.DELETED;
    await this.save(user);

    return {
      message: 'The user has been successfully deleted.',
    };
  }

  // method to suspend single company user per id
  async suspendUser(
    companyId: string,
    userId: string,
  ): Promise<MessageResponseDto> {
    const user = await this.findOne({
      where: { id: userId, company: { id: companyId } },
    });
    if (!user) {
      throw new HttpException(
        'User with this ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.status = UserStatus.SUSPENDED;
    await this.save(user);
    return {
      message: 'User is now suspended',
    };
  }

  // method to activate single company user per id
  async reactivateUser(
    companyId: string,
    userId: string,
  ): Promise<MessageResponseDto> {
    const user = await this.findOne({
      where: { id: userId, company: { id: companyId } },
    });
    if (!user) {
      throw new HttpException(
        'User with this ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.status = UserStatus.ACTIVE;
    await this.save(user);
    return {
      message: 'User is now active',
    };
  }

  // method to reset password for user
  async resetPasswordUser(
    companyId: string,
    userId: string,
  ): Promise<{
    message: string;
  }> {
    const userData = await this.findOne({
      where: { id: userId, company: { id: companyId } },
    });
    if (!userData) {
      throw new NotFoundException('User with this id does not exist.');
    }

    const randomPassword = await this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    userData.password = hashedPassword;

    await this.verifyEmail(userId, userData.email, hashedPassword);

    return {
      message: 'New password has been sent to email',
    };
  }
}
