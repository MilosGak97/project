import { Company } from "src/api/entities/company-entities/company.entity";
import { DataSource, Repository } from "typeorm";
import { GetCompaniesDto } from '../../admin/companies/dto/get-companies.dto';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCompanyDto } from "../../admin/companies/dto/update-company.dto";
import { CompanyStatus } from "src/api/enums/company-status.enum";
import { GetCompaniesResponseDto }  from '../../admin/companies/dto/get-companies-response.dto';

@Injectable()
export class CompanyRepository extends Repository<Company> {
    constructor(private readonly dataSource: DataSource) {
        super(Company, dataSource.createEntityManager())
    }

// method to list all companies    
    async getCompanies(getCompaniesDto: GetCompaniesDto): Promise<GetCompaniesResponseDto> {
        const { searchQuery, limit, offset } = getCompaniesDto

        const numLimit = Number(limit)
        const numOffset = Number(offset)

        const query = this.createQueryBuilder('company')
        if (searchQuery) {
            query.andWhere(
                '(company.name LIKE :searchQuery OR company.phone LIKE :searchQuery OR company.email LIKE :searchQuery OR company.website LIKE :searchQuery)',
                { searchQuery: `%${searchQuery}%` }
            )
        }
        query.take(limit)
        query.skip(offset)
        const [companies, totalRecords] = await query.getManyAndCount()
        const result = companies.map(({ id, name, website, phone_number, email, logo_url, status, address}) => ({
            id: id ?? '/',
            name:name  ?? '/',
            website:website ?? '/',
            phone_number:phone_number ?? '/',
            email: email ?? '/',
            logo_url:logo_url ?? '/',
            status:status,
            address1: address.address1 ?? '/',
            address2: address.address2 ?? '/',
            city: address.city ?? '/',
            state: address.state ?? '/',
            zipcode: address.zipcode ?? '/',
        }))
        const totalPages = Math.ceil(totalRecords / numLimit)
        const currentPage = Math.floor(numOffset / numLimit) + 1

        return {
            result,
            totalRecords,
            totalPages,
            currentPage,
            numLimit,
            numOffset
        }
    }

// method to list single company data
    async getCompany(id: string): Promise<Company> {
        const companyData = await this.findOne({ where: { id } })
        if (!companyData.id) {
            throw new NotFoundException('Company with this ID is not found.')
        }

        return companyData ;
    }

// method to update single company data
    async updateCompany(id: string, updateCompanyDataDto: UpdateCompanyDto):Promise<{
        message:string
    }> {
        const companyData = await this.findOne({ where: { id } })

        if (!companyData) {
            throw new NotFoundException('Company with this ID does not exist.')
        }

        const { name, address, phone, email, website, logo_url } = updateCompanyDataDto

        if (name) {
            const exist = await this.findOne({ where: { name } })
            if (exist && exist.id !== id) {
                throw new ConflictException('Company with this name already exist')
            }
            companyData.name = name;
        }

        if (address) {
            companyData.address = address
        }
        if (phone) {
            const exist = await this.findOne({ where: { phone_number: phone } })
            if (exist && exist.id !== id) {
                throw new ConflictException('Company with this phone number already exist')
            }
            companyData.phone_number = phone
        }

        if (email) {
            const exist = await this.findOne({ where: { email: email } })
            if (exist && exist.id !== id) {
                throw new ConflictException('Company with this email address already exist')
            }
            companyData.email = email
        }


        if (website) {
            const exist = await this.findOne({ where: { website: website } })
            if (exist && exist.id !== id) {
                throw new ConflictException('Company with this phone number already exist')
            }
            companyData.website = website
        }

        if (logo_url) {
            companyData.logo_url = logo_url
        }


        await this.save(companyData)
        return {
            message: "The company information has been updated successfully."
        }

    }

// method to delete single company    
    async deleteCompany(id: string): Promise<{
        message: string
    }> {
        const companyData = await this.findOne({ where: { id } })
        if (!companyData) {
            throw new NotFoundException('Company with this ID does not exist.')
        }
        companyData.status = CompanyStatus.DELETED
        return {
            message: "Company has been deleted succesfully."
        }
    }
}