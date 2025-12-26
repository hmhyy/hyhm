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
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { CreateLessonTemplateDto } from "./dto/create-lesson-template.dto";
import { UpdateLessonTemplateDto } from "./dto/update-lesson-template.dto";
import { LessonTemplateService } from "./lessonTemplate.service";
import { successRes } from "../common/response/succesResponse"; // yo'lni o'zingizga moslashtiring

@ApiTags("lesson-template")
@Controller("lesson-template")
export class LessonTemplateController {
  constructor(private readonly lessonTemplateService: LessonTemplateService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Yangi dars shabloni qo'shish" })
  @ApiResponse({ status: 201, description: "Shablon muvaffaqiyatli yaratildi" })
  @Post()
  async create(@Body() createLessonTemplateDto: CreateLessonTemplateDto) {
    const result = await this.lessonTemplateService.create(
      createLessonTemplateDto
    );
    return successRes(result, 201);
  }

  @ApiOperation({ summary: "Barcha dars shablonlarini olish" })
  @ApiResponse({ status: 200, description: "Shablonlar ro'yxati" })
  @Get()
  async findAll() {
    const result = await this.lessonTemplateService.findAll();
    return successRes(result);
  }

  @ApiOperation({ summary: "ID bo'yicha bitta dars shablonini olish" })
  @ApiResponse({ status: 200, description: "Shablon topildi" })
  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const result = await this.lessonTemplateService.findOne(id);
    return successRes(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "ID bo'yicha shablonni yangilash" })
  @ApiResponse({ status: 200, description: "Shablon yangilandi" })
  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateLessonTemplateDto: UpdateLessonTemplateDto
  ) {
    const result = await this.lessonTemplateService.update(
      id,
      updateLessonTemplateDto
    );
    return successRes(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: "ID bo'yicha shablonni o'chirish" })
  @ApiResponse({ status: 200, description: "Shablon o'chirildi" })
  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    const result = await this.lessonTemplateService.remove(id);
    return successRes(result);
  }

  @Post("templates/:id/apply")
  @ApiOperation({ summary: "Shablonni qo'llash" })
  @ApiParam({ name: "id", type: String, description: "Template ID" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli qo'llandi" })
  async applyTemplate(
    @Param("id") id: string,
    @Body() createLessonTemplateDto: CreateLessonTemplateDto
  ) {
    const result = await this.lessonTemplateService.applyTemplate(
      id,
      createLessonTemplateDto
    );
    return successRes(result);
  }
}
