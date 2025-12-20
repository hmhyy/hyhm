import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsArray,
  IsString,
  IsOptional,
} from "class-validator";

export class CreateTeacherPaymentDto {
  @ApiProperty({
    example: "uuid-teacher-id",
    description: "To'lov qilinayotgan o'qituvchi ID-si",
  })
  @IsUUID()
  @IsNotEmpty()
  teacher: string;

  @ApiProperty({
    example: ["uuid-lesson-1", "uuid-lesson-2"],
    description: "To'lov qilinayotgan darslar ro'yxati",
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  lessons: string[];

  @ApiProperty({ example: 500000, description: "Darslarning umumiy summasi" })
  @IsInt()
  @IsNotEmpty()
  totalLessonAmount: number;

  @ApiProperty({ example: 10, description: "Platforma komissiyasi (foizda)" })
  @IsInt()
  @IsNotEmpty()
  platformComission: number;

  @ApiProperty({ example: 50000, description: "Platforma oladigan summa" })
  @IsInt()
  @IsNotEmpty()
  platformAmount: number;

  @ApiProperty({
    example: 450000,
    description: "O'qituvchiga to'lanadigan summa",
  })
  @IsInt()
  @IsNotEmpty()
  teacherAmount: number;

  @ApiProperty({
    example: "uuid-admin-id",
    description: "To'lovni amalga oshirgan admin ID-si",
  })
  @IsUUID()
  @IsNotEmpty()
  paidBy: string;

  @ApiProperty({ example: "Oylik maosh", required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
