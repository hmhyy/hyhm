import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesEnum } from "src/common/enum";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("transactions")
@ApiBearerAuth('access-token')
@Controller("transactions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Yangi tranzaksiya yaratish" })
  create(@Body() createDto: CreateTransactionDto) {
    return this.transactionService.create(createDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Barcha tranzaksiyalarni olish" })
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.STUDENT, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "ID bo'yicha tranzaksiyani olish" })
  findOne(@Param("id") id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Tranzaksiyani yangilash" })
  update(@Param("id") id: string, @Body() updateDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateDto);
  }

  @Delete(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Tranzaksiyani o'chirish" })
  remove(@Param("id") id: string) {
    return this.transactionService.remove(id);
  }
}
