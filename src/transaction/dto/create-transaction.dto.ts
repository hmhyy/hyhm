import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
} from "class-validator";

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export class CreateTransactionDto {
  @ApiProperty({
    example: "uuid-lesson-id",
    description: "Tranzaksiya bog'langan dars ID-si",
  })
  @IsUUID()
  @IsNotEmpty()
  lesson: string;

  @ApiProperty({
    example: "uuid-student-id",
    description: "To'lovni amalga oshiruvchi talaba ID-si",
  })
  @IsUUID()
  @IsNotEmpty()
  student: string;

  @ApiProperty({
    example: 50000.0,
    description: "To'lov summasi",
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: TransactionStatus.PENDING,
    enum: TransactionStatus,
    description: "Tranzaksiya holati",
  })
  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: TransactionStatus;

  @ApiProperty({
    example: "To'lov tizimidagi xatolik",
    description: "Bekor qilish sababi",
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    example: "2025-12-20T10:00:00Z",
    description: "Amalga oshirilgan vaqt",
  })
  @IsDateString()
  @IsOptional()
  performaceTime?: Date;

  @ApiProperty({
    example: "2025-12-20T10:05:00Z",
    description: "Bekor qilingan vaqt",
  })
  @IsDateString()
  @IsOptional()
  canceledTime?: Date;
}
