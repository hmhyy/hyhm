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
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { NotificationService } from "./notification.service";
import { successRes } from "../common/response/succesResponse"; 

@ApiTags("notifications")
@Controller("notifications")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @Roles("admin")
  @ApiOperation({ summary: "Yangi xabarnoma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Xabarnoma muvaffaqiyatli yaratildi",
  })
  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const result = await this.notificationsService.create(
      createNotificationDto
    );
    return successRes(result, 201);
  }

  @Roles("admin")
  @ApiOperation({ summary: "Barcha xabarnomalarni ko'rish" })
  @ApiResponse({ status: 200, description: "Barcha xabarnomalar ro'yxati" })
  @Get()
  async findAll() {
    const result = await this.notificationsService.findAll();
    return successRes(result);
  }

  @Roles("admin", "student")
  @ApiOperation({ summary: "ID bo'yicha xabarnomani olish" })
  @ApiResponse({ status: 200, description: "Xabarnoma topildi" })
  @ApiResponse({ status: 404, description: "Xabarnoma topilmadi" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const result = await this.notificationsService.findOne(id);
    return successRes(result);
  }

  @Roles("admin")
  @ApiOperation({ summary: "Xabarnomani yangilash" })
  @ApiResponse({ status: 200, description: "Xabarnoma yangilandi" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    const result = await this.notificationsService.update(
      id,
      updateNotificationDto
    );
    return successRes(result);
  }

  @Roles("admin")
  @ApiOperation({ summary: "Xabarnomani o'chirish" })
  @ApiResponse({ status: 200, description: "Xabarnoma o'chirildi" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const result = await this.notificationsService.remove(id);
    return successRes(result);
  }
}
