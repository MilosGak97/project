import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail'; 

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Ensure your SENDGRID_API_KEY is set in the environment variables
  }
  async authEmail(to: string, verifyUrl: string, password: string):Promise<boolean> {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: #007bff;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background: #ADD8E6;
                color: #103551;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                background: #f1f1f1;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777;
            }
        </style><title>Title</title>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome!</h1>
            </div>
            <div class="content">
               ${password ? `<p>Your password is: <strong>${password}</strong></p>` : ''}
                 <p>Please verify your email by clicking on the button below:</p>
                <a href="${verifyUrl}" class="button">Verify Email</a>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;
    const msg = {
      to, // Recipient's email address
      from: 'milo@vanexpressmoving.com', // Your verified SendGrid sender email
      subject: 'Welcome to Our Service!',
      text: `Welcome! Your password is: ${password}. Please verify your email by clicking on this link: ${verifyUrl}`,
      html: htmlContent  };
    await sgMail.send(msg);
    return true
  }


  async userSignUp(to:string, verifyUrl: string, passcode: string){
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: #007bff;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background: #ADD8E6;
                color: #103551;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                background: #f1f1f1;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777;
            }
        </style><title>Title</title>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome!</h1>
            </div>
            <div class="content">
               ${passcode ? `<p>Your passcode is: <strong>${passcode}</strong></p>` : ''}
                 <p>Please verify your account by clicking on the button below:</p>
                <a href="${verifyUrl}" class="button">Verify Email</a>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} SubRosa Hub. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
`;
    const msg = {
      to, // Recipient's email address
      from: 'milo@vanexpressmoving.com', // Your verified SendGrid sender email
      subject: 'Welcome to Our Service!',
      text: `Welcome! Your passcode is: ${passcode}. Please verify your email by clicking on this link: ${verifyUrl}`,
      html: htmlContent  };

    try {
        await sgMail.send(msg);
        return {
            message: "Email has been sent successfully."
        }
      } catch (error) {
        console.error('Error sending email:', error.response.body); // Log the full error response
        throw new HttpException(
          {
            success: false,
            message: 'Failed to send email',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
  }


  async forgotPasswordEmail(to: string, resetUrl: string) {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: #007bff;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background: #ADD8E6;
                color: #103551;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                background: #f1f1f1;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777;
            }
        </style><title>Title</title>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset</h1>
            </div>
            <div class="content">
                <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                <p>Otherwise, click the button below to reset your password:</p>
                <a href="${resetUrl}" class="button">Reset Password</a>
                <p>If the button doesn't work, copy and paste the following URL into your browser:</p>
                <p>${resetUrl}</p>
                <p>This link will expire in 15 minutes.</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} SubRosa Hub. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const msg = {
        to, // Recipient's email address
        from: 'milo@vanexpressmoving.com', // Your verified SendGrid sender email
        subject: 'Password Reset Request',
        text: `We received a request to reset your password. Click the following link to reset it: ${resetUrl}. If you didn't make this request, you can ignore this email.`,
        html: htmlContent
    };

    try {
        await sgMail.send(msg);
        return {
            message: "Password reset email sent successfully."
        };
    } catch (error) {
        console.error('Error sending email:', error.response.body); // Log the full error response
        throw new HttpException(
            {
                success: false,
                message: 'Failed to send password reset email',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

 
}
