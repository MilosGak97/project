import { Admin } from 'src/api/entities/admin-entities/admin.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateAdminDto } from 'src/api/admin/admins/dto/create-admin.dto';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GetAdminsDto } from 'src/api/admin/admins/dto/get-admins.dto';
import * as bcrypt from 'bcrypt';
import { AdminRole } from 'src/api/enums/admin-role.enum';
import { AdminStatus } from 'src/api/enums/admin-status.enum';
import { EmailService } from 'src/api/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateAdminDto } from 'src/api/admin/admins/dto/update-admin.dto';
import { UserType } from 'src/api/enums/user-type.enum';
import { GetAdminsResponseDto } from 'src/api/admin/admins/dto/get-admins-response.dto';
import { GetAdminsTypeDto } from '../../admin/admins/dto/get-admins-type.dto';
import { AdminDto } from '../../admin/admins/dto/admin.dto';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  private readonly logger = new Logger(AdminRepository.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {
    super(Admin, dataSource.createEntityManager());
  }

  /* ----------- PRIVATE METHOD ----------------*/

  // private method that will generate random string (password)
  private async generateRandomPassword(length: number = 8): Promise<string> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  // private method that will call function for veryfing email
  private async verifyEmail(
    userId: string,
    email: string,
    randomPassword?: string,
  ):Promise<boolean> {
    const jwtPayload = { userId: userId, expireIn: '3600' };
    const verifyUrl = `${process.env.BASE_URL}admin/auth/email?jwtToken=${encodeURIComponent(this.jwtService.sign(jwtPayload, { secret: process.env.ADMIN_JWT_SECRET, }))}`;
    const emailSent = await this.emailService.authEmail(
      email,
      verifyUrl,
      randomPassword || '',
    );
    if(!emailSent){
      throw new HttpException({
        success:false,
        message: "Verification email was not send"
      },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return true
  }

  /* ---------- PUBLIC METHOD ------------- */

  // method to get all admin data
  async getAdmins(getAdminsDto: GetAdminsDto): Promise<GetAdminsResponseDto> {
    const {
      searchQuery,
      role,
      status,
      email_verified,
      initial_password,
      limit,
      offset,
    } = getAdminsDto;

    const query = this.createQueryBuilder('adminUser');

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    if (searchQuery) {
      query.andWhere(
        '(adminUser.name LIKE :searchQuery OR adminUser.email LIKE :searchQuery OR adminUser.phone_number LIKE :searchQuery)',
        { searchQuery: `%${searchQuery}` },
      );
    }

    if (role) {
      query.andWhere('(adminUser.role = :role)', { role });
    }

    if (status) {
      query.andWhere('(adminUser.status = :status)', { status });
    }

    if (initial_password) {
      query.andWhere('(adminUser.initial_password = :initial_password)', {
        initial_password,
      });
    }

    if (email_verified) {
      query.andWhere('(adminUser.email_verified = :email_verified)', {
        email_verified,
      });
    }

    query.take(limitNumber);
    query.skip(offsetNumber);

    const [admins, totalRecords] = await query.getManyAndCount();
    const result: GetAdminsTypeDto[] = admins.map(
      ({ id, name, email, role, status, phone_number }) => ({
        id: id ?? '/',
        name: name ?? '/',
        email: email ?? '/',
        role: role,
        status: status,
        phone_number: phone_number ?? '/',
      }),
    );

    const currentPage = Math.floor(offset / limitNumber) + 1;
    const totalPages = Math.ceil(totalRecords / limitNumber);

    return {
      result,
      totalRecords,
      currentPage,
      totalPages,
      limitNumber,
      offsetNumber,
    };
  }

  // method to create admin
  async createAdmin(createAdminDto: CreateAdminDto): Promise<{
    message: string;
  }> {
    const { name, email, phone_number, role, created_by } = createAdminDto;

    const existingUser = await this.findOne({
      where: [
        { email: email },
        //{ phone_number: phone_number || null },
      ],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new HttpException(
          {
            success: false,
            message:
              'An admin user with this email already exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (phone_number && existingUser.phone_number === phone_number) {
        throw new HttpException(
          {
            success: false,
            message:
              'An admin user with this phone number already exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }


    try {
      // Generate random password
      const randomPassword = await this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newAdminUser = new Admin();
      newAdminUser.name = name;
      newAdminUser.email = email;
      newAdminUser.phone_number = phone_number
        ? phone_number
        : null;
      newAdminUser.role = role as AdminRole;
      newAdminUser.password = hashedPassword;
      newAdminUser.created_by = created_by;
      newAdminUser.status = AdminStatus.UNVERIFIED;
      newAdminUser.email_verified = false;
      newAdminUser.initial_password = true;
      newAdminUser.status_changed_at = new Date();
      newAdminUser.user_type = UserType.EMPLOYEE;

      // Save the new admin user to the database
      await this.save(newAdminUser);

      // verify email method  newAdminUser.id
      await this.verifyEmail(newAdminUser.id, email, randomPassword);

      // Return success response
      return {
        message: 'The user has been created successfully.',
      };
    } catch (error) {
      this.logger.error('Error creating admin user', error.stack); // Log the error stack
      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // method to show single admin data
  async getAdmin(id: string): Promise<AdminDto> {
    const admin = await this.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException('Admin with this ID is not found.');
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      phone_number: admin.phone_number,
      role: admin.role,
      status: admin.status,
    };
  }

  // method to update single admin data
  async updateAdmin(
    updateAdminDto: UpdateAdminDto,
    id: string,
  ): Promise<{
    message: string;
  }> {
    const { name, email, phone_number, status, role } = updateAdminDto;

    const adminData = await this.findOne({ where: { id: id } });

    if (!adminData) {
      throw new NotFoundException('No user found with this ID.');
    }

    if (name) {
      adminData.name = name;
    }

    if (email) {
      const emailExist = await this.findOne({ where: { email: email } });
      if (emailExist && emailExist.id !== id) {
        throw new ConflictException(
          'This email address is already associated with an existing user.',
        );
      }
      adminData.email = email;
      await this.verifyEmail(adminData.id, email);
      adminData.email_verified = false;
    }

    if (phone_number) {
      const phoneExist = await this.findOne({
        where: { phone_number: phone_number },
      });
      if (phoneExist && phoneExist.id !== id) {
        throw new ConflictException(
          'This phone number is already associated with an existing user.',
        );
      }
      adminData.phone_number = phone_number;
    }

    if (status) {
      adminData.status = status;
      adminData.status_changed_at = new Date();
    }

    if (role) {
      adminData.role = role;
    }

    await this.save(adminData);

    return { message: 'User is updated' };
  }

  // method to resend email verification
  async resendEmailVerification(id: string): Promise<{
    message: string;
  }> {
    const adminData = await this.findOne({ where: { id: id } });
    if (!adminData) {
      throw new NotFoundException('No user found with this ID.');
    }
    if (adminData.email_verified === true) {
      throw new ConflictException("User's email is already verified");
    }
    await this.verifyEmail(id, adminData.email);
    return { message: 'A new email verification link has been sent.' };
  }

  // method to reset password
  async resetPassword(id: string): Promise<{
    message: string;
  }> {
    const adminData = await this.findOne({ where: { id: id } });
    if (!adminData) {
      throw new NotFoundException('No user found with this ID.');
    }

    const randomPassword = await this.generateRandomPassword();

    await this.verifyEmail(id, adminData.email, randomPassword);

    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    adminData.password = hashedPassword;
    adminData.initial_password = true;

    await this.save(adminData);

    return { message: 'A new password has been sent to: ' + adminData.email };
  }

  // method to delete admin
  async deleteAdmin(id: string): Promise<{
    message: string;
  }> {
    const userData = await this.findOne({ where: { id } });

    if (!userData) {
      throw new NotFoundException('No user found with this ID.');
    }

    userData.status = AdminStatus.DELETED;
    await this.save(userData);
    return { message: 'Account has been successfully deleted.' };
  }
}