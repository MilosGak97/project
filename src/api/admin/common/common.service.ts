import { Injectable } from '@nestjs/common';
import { StatesAbbreviation } from '../../enums/states-abbreviation.enum';
import { StatesResponseDto } from './dto/states-response.dto';

@Injectable()
export class CommonService {
  async getStates(): Promise<StatesResponseDto> {
    const states = Object.values(StatesAbbreviation);
    return { states };
  }
}
