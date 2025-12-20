import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  CreateTransactionDto,
  TransactionStatus,
} from "./create-transaction.dto";
import { IsOptional, IsString, IsEnum, IsDateString } from "class-validator";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiPropertyOptional({
    example: TransactionStatus.COMPLETED,
    enum: TransactionStatus,
  })
  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @ApiPropertyOptional({
    example: "To'lov muvaffaqiyatli yakunlandi",
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    example: "2025-12-20T15:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  performaceTime?: Date;

  @ApiPropertyOptional({
    example: "2025-12-20T15:05:00Z",
  })
  @IsOptional()
  @IsDateString()
  canceledTime?: Date;
}
