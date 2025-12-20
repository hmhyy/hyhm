import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateTeacherPaymentDto } from "./create-teacher-payment.dto";
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
} from "class-validator";

export class UpdateTeacherPaymentDto extends PartialType(
  CreateTeacherPaymentDto
) {
  @ApiPropertyOptional({
    example: true,
    description: "To'lov bekor qilinganmi?",
  })
  @IsOptional()
  @IsBoolean()
  isCanceled?: boolean;

  @ApiPropertyOptional({
    example: "2025-12-20T12:00:00Z",
    description: "Bekor qilingan vaqt",
  })
  @IsOptional()
  @IsDateString()
  canceledAt?: Date;

  @ApiPropertyOptional({
    example: "uuid-admin-id",
    description: "Bekor qilgan shaxs (ID)",
  })
  @IsOptional()
  @IsUUID()
  canceledBy?: string;

  @ApiPropertyOptional({
    example: "Noto'g'ri hisoblangan summa",
    description: "Bekor qilish sababi",
  })
  @IsOptional()
  @IsString()
  canceledReason?: string;

  @ApiPropertyOptional({
    example: "Keyingi oyga ko'chirildi",
    description: "Qo'shimcha eslatmalar",
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
