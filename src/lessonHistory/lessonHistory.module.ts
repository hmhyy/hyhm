import { Module } from "@nestjs/common";
import { TeachersController } from "./lessonHistory.controller";
import { TeachersService } from "./lessonHistory.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonHistory]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: Number(process.env.ACCESS_TOKEN_TIME) },
    }),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class LessonHistoryModule {}
