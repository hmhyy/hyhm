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
import { CreateLessonHistoryDto } from "./dto/create-lesson-history.dto";
import { UpdateLessonHistoryDto } from "./dto/update-lesson-history.dto";
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesEnum, TeacherRole } from "../common/enum";
import { LessonHistoryService } from "./lessonHistory.service";

@ApiTags("lesson-history")
@Controller("lesson-history")
export class LessonHistoryController {
  constructor(private readonly lessonHistoryService: LessonHistoryService) { }

  @Post()
  @Roles(RolesEnum.ADMIN, TeacherRole.TEACHER, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Dars tarixini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Dars tarixi muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Yaroqsiz ma'lumotlar" })
  create(@Body() createDto: CreateLessonHistoryDto) {
    return this.lessonHistoryService.create(createDto);
  }

  @Get()
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Barcha darslar tarixini olish" })
  @ApiResponse({ status: 200, description: "Darslar tarixi ro'yxati" })
  findAll() {
    return this.lessonHistoryService.findAll();
  }

  @Get(":id")
  @Roles(RolesEnum.ADMIN, TeacherRole.TEACHER, RolesEnum.STUDENT, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "ID bo'yicha dars tarixini olish" })
  @ApiResponse({ status: 200, description: "Dars tarixi topildi" })
  @ApiResponse({ status: 404, description: "Dars tarixi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.lessonHistoryService.findOne(id);
  }

  @Patch(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Dars tarixini yangilash" })
  @ApiResponse({ status: 200, description: "Dars tarixi yangilandi" })
  update(@Param("id") id: string, @Body() updateDto: UpdateLessonHistoryDto) {
    return this.lessonHistoryService.update(id, updateDto);
  }

  @Delete(":id")
  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Dars tarixini o'chirish" })
  @ApiResponse({ status: 200, description: "Dars tarixi o'chirildi" })
  remove(@Param("id") id: string) {
    return this.lessonHistoryService.remove(id);
  }
}
