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
import { AdminGuard } from "../common/guards/admin.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { successRes } from "../common/response/succesResponse"; // yo'lni o'zingizga moslashtiring

@ApiTags("teacher-payments")
@Controller("teacher-payments")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeacherPaymentController {
  constructor(private readonly teacherPaymentService: TeacherPaymentService) {}

  @Post()
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "O'qituvchiga to'lov qilish" })
  @ApiResponse({
    status: 201,
    description: "To'lov muvaffaqiyatli amalga oshirildi",
  })
  async create(@Body() createDto: CreateTeacherPaymentDto) {
    const result = await this.teacherPaymentService.create(createDto);
    return successRes(result, 201);
  }

  @Get()
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Barcha to'lovlar ro'yxatini olish" })
  @ApiResponse({ status: 200, description: "Barcha to'lovlar ro'yxati" })
  async findAll() {
    const result = await this.teacherPaymentService.findAll();
    return successRes(result);
  }

  @Get(":id")
  @Roles("admin", "teacher")
  @ApiOperation({ summary: "ID bo'yicha to'lov ma'lumotini olish" })
  @ApiResponse({ status: 200, description: "To'lov ma'lumoti topildi" })
  @ApiResponse({ status: 404, description: "To'lov topilmadi" })
  async findOne(@Param("id") id: string) {
    const result = await this.teacherPaymentService.findOne(+id);
    return successRes(result);
  }

  @Patch(":id")
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "To'lov ma'lumotini yangilash yoki bekor qilish" })
  @ApiResponse({ status: 200, description: "To'lov yangilandi" })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateTeacherPaymentDto
  ) {
    const result = await this.teacherPaymentService.update(+id, updateDto);
    return successRes(result);
  }

  @Delete(":id")
  @Roles("admin")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: "To'lovni o'chirish" })
  @ApiResponse({ status: 200, description: "To'lov o'chirildi" })
  async remove(@Param("id") id: string) {
    const result = await this.teacherPaymentService.remove(+id);
    return successRes(result);
  }
}
