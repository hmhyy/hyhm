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
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CreateDeletedTeacherDto } from "./dto/create-deleted-teacher.dto";
import { UpdateDeletedTeacherDto } from "./dto/update-deleted-teacher.dto";
import { DeletedTeachersService } from "./deletedTeacher.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesEnum } from "../common/enum";

@ApiTags("deleted-teachers")
@ApiBearerAuth()
@Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
@Controller("deleted-teachers")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeletedTeachersController {
  constructor(
    private readonly deletedTeachersService: DeletedTeachersService
  ) { }

  @ApiOperation({
    summary: "O'qituvchini o'chirilganlar ro'yxatiga (tarixga) qo'shish",
  })
  @ApiResponse({ status: 201, description: "O'chirish qaydi yaratildi" })
  @Post()
  create(@Body() createDto: CreateDeletedTeacherDto) {
    return this.deletedTeachersService.create(createDto);
  }

  @ApiOperation({ summary: "Barcha o'chirilgan o'qituvchilar tarixini olish" })
  @ApiResponse({ status: 200, description: "O'chirilganlar ro'yxati" })
  @Get()
  findAll() {
    return this.deletedTeachersService.findAll();
  }

  @ApiOperation({ summary: "ID bo'yicha bitta o'chirish qaydini olish" })
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.deletedTeachersService.findOne(id);
  }

  @ApiOperation({ summary: "O'chirish sababi yoki vaqtini yangilash" })
  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateDeletedTeacherDto
  ) {
    return this.deletedTeachersService.update(id, updateDto);
  }

  @ApiOperation({ summary: "O'chirish qaydini bazadan butunlay o'chirish" })
  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.deletedTeachersService.remove(id);
  }
}
