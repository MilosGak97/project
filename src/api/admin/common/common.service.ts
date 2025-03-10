import { Injectable } from '@nestjs/common';
import { StatesAbbreviation } from '../../enums/states-abbreviation.enum';
import { StatesResponseDto } from './dto/states-response.dto';
import { countries } from 'country-codes-flags-phone-codes';
import { PhoneNumbersAndFlagsResponseDto } from './dto/phone-numbers-and-flags-response.dto';

@Injectable()
export class CommonService {
  async getStates(): Promise<StatesResponseDto> {
    const states = Object.values(StatesAbbreviation);
    return { states };
  }

  async getPhoneNumbersAndFlags(): Promise<PhoneNumbersAndFlagsResponseDto[]> {
    const countriesFiltered = countries.map((country) => ({
      name: country.name,
      code: country.code,
      flag: `https://flagsapi.com/${country.code}/flat/16.png`,
      prefix: country.dialCode,
    }));
    return countriesFiltered;
  }
}
