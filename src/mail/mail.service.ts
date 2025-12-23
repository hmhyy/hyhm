import { Injectable } from "@nestjs/common";
import { Teacher } from "../teacher/entities/teacher.entity";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, fullName: string, otpCode: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Welcome to HMHY App!",
      template: "./confirmation",
      context: {
        fullName: fullName,
        otpCode,
      },
    });
  }
}
