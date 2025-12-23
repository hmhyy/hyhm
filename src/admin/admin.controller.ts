import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminService } from "./admin.service";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { RolesEnum } from "src/common/enum";

@ApiTags("Admin")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly adminsService: AdminService) {}

  @Get("me")
  @ApiOperation({ summary: "Get current admin profile" })
  getProfile(@Request() req) {
    return this.adminsService.getProfile(req.user.id);
  }

  @Patch("me")
  @ApiOperation({ summary: "Update own profile" })
  updateProfile(@Request() req, @Body() updateDto: UpdateAdminDto) {
    return this.adminsService.updateProfile(req.user.id, updateDto);
  }

  @Roles(RolesEnum.SUPER_ADMIN)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Roles(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(id);
  }

  @Roles(RolesEnum.SUPER_ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Roles(RolesEnum.SUPER_ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(id);
  }
}
