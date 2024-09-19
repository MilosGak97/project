import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  private sesClient: SESClient;

  constructor() {
    // Initialize SES Client with the region
    this.sesClient = new SESClient({ region: 'eu-north-1' }); // Ensure region matches your SES configuration
  }

  async sendAdminWelcomeEmail(email: string, password: string, verifyUrl:string): Promise<void> {
    const params = {
      Destination: {
        ToAddresses: [email], // Recipient email address
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <h1>Welcome, Admin!</h1>
              <p>Your account has been created. Here are your login credentials:</p>
              <ul>
                <li>Email: ${email}</li>
                <li>Password: ${password}</li>
              </ul>
              <p> Please click on link below to verify your account </p>
              <a href="${verifyUrl}"> Login and Verify Email </a>
            `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Welcome to the Admin Panel',
        },
      },
      Source: 'no-reply@subrosahub.com', // Verified email/domain in SES
    };

    try {
      const command = new SendEmailCommand(params);
      await this.sesClient.send(command);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
