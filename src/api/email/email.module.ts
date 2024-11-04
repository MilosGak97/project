import { Module } from '@nestjs/common';
import { EmailService } from './email.service'; 
import * as AWS from 'aws-sdk';

@Module({ 
  providers: [EmailService]
})
export class EmailModule {}
