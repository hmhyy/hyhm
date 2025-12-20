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
import { AdminGuard } from "../common/guards/admin.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("transactions")
@Controller("transactions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Roles("admin", "student")
  @ApiOperation({ summary: "Yangi tranzaksiya yaratish" })
  create(@Body() createDto: CreateTransactionDto) {
    return this.transactionService.create(createDto);
  }

  @Get()
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Barcha tranzaksiyalarni olish" })
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(":id")
  @Roles("admin", "student")
  @ApiOperation({ summary: "ID bo'yicha tranzaksiyani olish" })
  findOne(@Param("id") id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(":id")
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Tranzaksiyani yangilash" })
  update(@Param("id") id: string, @Body() updateDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateDto);
  }

  @Delete(":id")
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Tranzaksiyani o'chirish" })
  remove(@Param("id") id: string) {
    return this.transactionService.remove(id);
  }
}
