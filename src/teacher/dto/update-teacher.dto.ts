import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  MinLength,
} from "class-validator";

export class UpdateTeacherDto {
  @ApiPropertyOptional({
    example: "John Doe",
    description: "Full name of the teacher",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "https://example.com/image.jpg",
    description: "Image URL",
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    example: 0,
    description: "Hour price",
  })
  @IsOptional()
  @IsNumber()
  hourPrice?: number;

  @ApiPropertyOptional({
    example: "+998901234567",
    description: "Phone number",
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: "Advanced",
    description: "Level",
  })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiPropertyOptional({
    example: "10 years",
    description: "Experience",
  })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({
    example: "Experienced teacher with 10 years of experience",
    description: "Bio/Description",
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    example: "https://portfolio.example.com/video",
    description: "Portfolio video link",
  })
  @IsOptional()
  @IsString()
  portfolioVideoLink?: string;

  @ApiPropertyOptional({
    example: "8600123456789012",
    description: "Card number",
  })
  @IsOptional()
  @IsString()
  cardNumber?: string;

  @ApiPropertyOptional({
    example: "English",
    description: "Teaching language",
  })
  @IsOptional()
  @IsString()
  teachingLanguage?: string;

  @ApiPropertyOptional({
    example: ["string"],
    description: "Lessons",
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  lessons?: string[];

  @ApiPropertyOptional({
    example: "string",
    description: "Google ID",
  })
  @IsOptional()
  @IsString()
  googleId?: string;

  @ApiPropertyOptional({
    example: "string",
    description: "Google refresh token",
  })
  @IsOptional()
  @IsString()
  googleRefreshToken?: string;

  @ApiPropertyOptional({
    example: "string",
    description: "Google access token",
  })
  @IsOptional()
  @IsString()
  googleAccessToken?: string;

  @ApiPropertyOptional({
    example: 0,
    description: "Rating",
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiPropertyOptional({
    example: true,
    description: "Is active",
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: "+998901234567",
    description: "Telefon raqami",
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: "password123",
    description: "Foydalanuvchi paroli (kamida 6 ta belgi)",
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  password?: string;

  @IsOptional()
  @IsString()
  otpCode?: string | null;

  @IsOptional()
  otpExpires?: Date | null;

  @ApiPropertyOptional({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "Foydalanuvchining refresh tokini",
  })
  @IsOptional()
  @IsString()
  refreshToken?: string | null;
}
