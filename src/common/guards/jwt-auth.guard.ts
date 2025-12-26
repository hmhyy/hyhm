import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (req.cookies) {
      token =
        req.cookies.access_token ||
        req.cookies.adminToken ||
        req.cookies.teacherToken;
    }

    if (!token) {
      throw new UnauthorizedException("Token topilmadi");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      req.user = payload;
      return true;
    } catch (error) {
      console.log("JWT Verify Error:", error.message);
      throw new UnauthorizedException("Token yaroqsiz yoki muddati o'tgan");
    }
  }
}
