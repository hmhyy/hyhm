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
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { CreateDeletedTeacherDto } from "./dto/create-deleted-teacher.dto";
import { UpdateDeletedTeacherDto } from "./dto/update-deleted-teacher.dto";
import { DeletedTeachersService } from "./deletedTeacher.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { successRes } from "../common/response/succesResponse"; 

@ApiTags("deleted-teachers")
@Controller("deleted-teachers")
@UseGuards(JwtAuthGuard, AdminGuard)
export class DeletedTeachersController {
  constructor(
    private readonly deletedTeachersService: DeletedTeachersService
  ) {}

  @ApiOperation({
    summary: "O'qituvchini o'chirilganlar ro'yxatiga (tarixga) qo'shish",
  })
  @ApiResponse({ status: 201, description: "O'chirish qaydi yaratildi" })
  @Post()
  async create(@Body() createDto: CreateDeletedTeacherDto) {
    const result = await this.deletedTeachersService.create(createDto);
    return successRes(result, 201);
  }

  @ApiOperation({ summary: "Barcha o'chirilgan o'qituvchilar tarixini olish" })
  @ApiResponse({ status: 200, description: "O'chirilganlar ro'yxati" })
  @Get()
  async findAll() {
    const result = await this.deletedTeachersService.findAll();
    return successRes(result);
  }

  @ApiOperation({ summary: "ID bo'yicha bitta o'chirish qaydini olish" })
  @ApiResponse({ status: 200, description: "O'chirish qaydi topildi" })
  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const result = await this.deletedTeachersService.findOne(id);
    return successRes(result);
  }

  @ApiOperation({ summary: "O'chirish sababi yoki vaqtini yangilash" })
  @ApiResponse({ status: 200, description: "O'chirish qaydi yangilandi" })
  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateDeletedTeacherDto
  ) {
    const result = await this.deletedTeachersService.update(id, updateDto);
    return successRes(result);
  }

  @ApiOperation({ summary: "O'chirish qaydini bazadan butunlay o'chirish" })
  @ApiResponse({
    status: 200,
    description: "O'chirish qaydi butunlay o'chirildi",
  })
  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    const result = await this.deletedTeachersService.remove(id);
    return successRes(result);
  }
}
