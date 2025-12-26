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
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { NotificationService } from "./notification.service";
import { RolesEnum, TeacherRole } from "../common/enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("notifications")
@ApiBearerAuth('access-token')
@Controller("notifications")
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) { }

  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Yangi xabarnoma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Xabarnoma muvaffaqiyatli yaratildi",
  })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Barcha xabarnomalarni ko'rish" })
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN, TeacherRole.ADMIN)
  @ApiOperation({ summary: "ID bo'yicha xabarnomani olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(id);
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Xabarnomani yangilash" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Roles(RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: "Xabarnomani o'chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(id);
  }
}
