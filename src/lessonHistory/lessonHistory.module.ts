import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { LessonHistory } from "./entities/lessonHistory.entity";
import { LessonHistoryController } from "./lessonHistory.controller";
import { LessonHistoryService } from "./lessonHistory.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonHistory]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: Number(process.env.ACCESS_TOKEN_TIME) },
    }),
  ],
  controllers: [LessonHistoryController],
  providers: [LessonHistoryService],
  exports: [LessonHistoryService],
})
export class LessonHistoryModule {}
