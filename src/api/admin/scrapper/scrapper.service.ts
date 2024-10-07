import { Injectable } from '@nestjs/common';
import { ScrapperFunctionRepository } from './repository/scrapper-function.repository';

@Injectable()
export class ScrapperService {
    constructor(
        private readonly scrapperFunctionRepository: ScrapperFunctionRepository
    ){}

    
}
