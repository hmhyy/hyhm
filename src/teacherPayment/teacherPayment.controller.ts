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
import { CreateTeacherPaymentDto } from "./dto/create-teacher-payment.dto";
import { UpdateTeacherPaymentDto } from "./dto/update-teacher-payment.dto";
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { TeacherPaymentService } from "./teacherPayment.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesEnum } from "src/common/enum";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("teacher-payments")
@ApiBearerAuth('access-token')
@Controller("teacher-payments")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeacherPaymentController {
  constructor(private readonly teacherPaymentService: TeacherPaymentService) { }

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "O'qituvchiga to'lov qilish" })
  @ApiResponse({
    status: 201,
    description: "To'lov muvaffaqiyatli amalga oshirildi",
  })
  create(@Body() createDto: CreateTeacherPaymentDto) {
    return this.teacherPaymentService.create(createDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Barcha to'lovlar ro'yxatini olish" })
  findAll() {
    return this.teacherPaymentService.findAll();
  }

  @Get(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "ID bo'yicha to'lov ma'lumotini olish" })
  findOne(@Param("id") id: string) {
    return this.teacherPaymentService.findOne(+id);
  }

  @Patch(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "To'lov ma'lumotini yangilash yoki bekor qilish" })
  update(@Param("id") id: string, @Body() updateDto: UpdateTeacherPaymentDto) {
    return this.teacherPaymentService.update(+id, updateDto);
  }

  @Delete(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "To'lovni o'chirish" })
  remove(@Param("id") id: string) {
    return this.teacherPaymentService.remove(+id);
  }
}
