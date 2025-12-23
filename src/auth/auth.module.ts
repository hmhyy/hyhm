import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthTeacherController } from "./teacher/auth-teacher.controller";
import { AuthTeacherService } from "./teacher/auth-teacher.service";
import { TeacherModule } from "../teacher/teacher.module";
import { AuthAdminController } from "./admin/auth-admin.controller";
import { AuthAdminService } from "./admin/auth-admin.service";
import { AdminModule } from "../admin/admin.module";
import { GoogleStrategy } from "./google.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "../teacher/entities/teacher.entity";
import { MailService } from "../mail/mail.service";
import { MailerService } from "@nestjs-modules/mailer";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    JwtModule.register({}),
    TeacherModule,
    AdminModule,
    TypeOrmModule.forFeature([Teacher]),
    MailModule
  ],
  controllers: [AuthTeacherController, AuthAdminController],
  providers: [AuthTeacherService, AuthAdminService, GoogleStrategy],
  exports: [AuthTeacherService],
})
export class AuthModule {}
