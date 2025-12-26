import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { AuthStudentService } from "./auth-student.service";
import { SignInDtoStudent } from "../dto/sign-in-student.dto";
import { successRes } from "../../common/response/succesResponse"; // yo'lni o'zingizga moslashtiring

@ApiTags("Student Auth")
@Controller("auth/student")
export class AuthStudentController {
  constructor(private readonly authService: AuthStudentService) {}

  @ApiOperation({ summary: "Tizimga kirish (Login)" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli kirildi" })
  @ApiResponse({ status: 400, description: "Email yoki password noto'g'ri" })
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDtoStudent,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.signIn(signInDto, res);
    return successRes(result);
  }

  @ApiOperation({ summary: "Tokenni yangilash (Refresh Token)" })
  @ApiParam({ name: "id", description: "Student ID", example: "uuid" })
  @ApiResponse({ status: 200, description: "Access token yangilandi" })
  @ApiResponse({ status: 403, description: "Refresh token xato" })
  @HttpCode(HttpStatus.OK)
  @Post(":id/refresh")
  async refresh(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.refreshToken(id, refreshToken, res);
    return successRes(result);
  }

  @ApiOperation({ summary: "Tizimdan chiqish (Logout)" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli chiqildi" })
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.signOut(refreshToken, res);
    return successRes(result);
  }
}
