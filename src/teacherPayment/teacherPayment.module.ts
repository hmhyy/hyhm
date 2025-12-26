import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { TeacherPayment } from "./entities/teacherPayment.entity";
import { TeacherPaymentController } from "./teacherPayment.controller";
import { TeacherPaymentService } from "./teacherPayment.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherPayment]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: Number(process.env.ACCESS_TOKEN_TIME) },
    }),
  ],
  controllers: [TeacherPaymentController],
  providers: [TeacherPaymentService, JwtAuthGuard],
  exports: [TeacherPaymentService],
})
export class TeacherPaymentModule {}
