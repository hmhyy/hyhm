import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesEnum, TeacherRole } from "../common/enum";
import { CreateLessonTemplateDto } from "./dto/create-lesson-template.dto";
import { UpdateLessonTemplateDto } from "./dto/update-lesson-template.dto";
import { LessonTemplateService } from "./lessonTemplate.service";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";

@ApiTags("lesson-template")
@ApiBearerAuth('access-token')
@Roles(TeacherRole.TEACHER, RolesEnum.SUPER_ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("lesson-template")
export class LessonTemplateController {
  constructor(private readonly lessonTemplateService: LessonTemplateService) { }

  @ApiOperation({ summary: "Yangi dars shabloni qo'shish" })
  @ApiResponse({ status: 201, description: "Shablon muvaffaqiyatli yaratildi" })
  @Post()
  create(@Body() createLessonTemplateDto: CreateLessonTemplateDto) {
    return this.lessonTemplateService.create(createLessonTemplateDto);
  }



  @ApiOperation({ summary: "Barcha dars shablonlarini olish" })
  @ApiResponse({ status: 200, description: "Shablonlar ro'yxati" })
  @Get()
  findAll() {
    return this.lessonTemplateService.findAll();
  }


  @ApiOperation({ summary: "ID bo'yicha bitta dars shablonini olish" })
  @ApiResponse({ status: 200, description: "Shablon topildi" })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.lessonTemplateService.findOne(id);
  }


  @ApiOperation({ summary: "ID bo'yicha shablonni yangilash" })
  @ApiResponse({ status: 200, description: "Shablon yangilandi" })
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string, // UUID ekanligini tekshirish qo'shildi
    @Body() updateLessonTemplateDto: UpdateLessonTemplateDto
  ) {
    return this.lessonTemplateService.update(id, updateLessonTemplateDto);
  }


  @ApiOperation({ summary: "ID bo'yicha shablonni o'chirish" })
  @ApiResponse({ status: 200, description: "Shablon o'chirildi" })
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.lessonTemplateService.remove(id);
  }



  @Post("templates/:id/apply")
  @ApiOperation({ summary: "Shablonni qo'llash" })
  @ApiParam({ name: "id", type: String, description: "Template ID" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli qo'llandi" })
  applyTemplate(
    @Param("id") id: string,
    @Body() createLessonTemplateDto: CreateLessonTemplateDto
  ) {
    return this.lessonTemplateService.applyTemplate(id, createLessonTemplateDto);
  }
}
