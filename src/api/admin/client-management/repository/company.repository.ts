import { Company } from "src/api/entities/company.entity";
import { DataSource, Repository } from "typeorm";
import { ListAllCompaniesDto } from "../dto/list-all-companies.dto";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCompanyDataDto } from "../dto/update-company-data.dto";
import { CompanyStatus } from "src/api/enums/company-status.enum";

@Injectable()
export class CompanyRepository extends Repository<Company> {
    constructor(private readonly dataSource: DataSource) {
        super(Company, dataSource.createEntityManager())
    }

// method to list all companies    
    async listAllCompanies(listAllCompaniesDto: ListAllCompaniesDto): Promise<{
        result: Company[],
        totalRecords: number,
        totalPages: number,
        currentPage: number,
        numLimit: number,
        numOffset: number
    }> {
        const { searchQuery, limit, offset } = listAllCompaniesDto

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
        const [result, totalRecords] = await query.getManyAndCount() 
        const totalPages = Math.ceil(totalRecords / numLimit)
        const currentPage = Math.ceil(numOffset / numLimit) + 1

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
    async companyData(id: string): Promise<{ 
        companyData: Company 
    }> {
        const companyData = await this.findOne({ where: { id } })
        if (!companyData) {
            throw new NotFoundException('Company with this ID is not found.')
        }

        return { companyData };
    }

// method to update single company data
    async updateCompanyData(id: string, updateCompanyDataDto: UpdateCompanyDataDto):Promise<{
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