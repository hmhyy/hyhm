import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class RegisterStep3Dto {
  @ApiProperty({
    description: "O'qituvchining UUID identifikatori",
    example: "ac7a04e4-a4c6-42f9-84d8-61a674d911ae",
  })
  @IsString()
  teacherId: string;

  @ApiProperty({
    description: "Telefonga kelgan 6 xonali tasdiqlash kodi",
    example: "123456",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  otpCode: string;
}
