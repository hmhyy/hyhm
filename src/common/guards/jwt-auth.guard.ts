import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    let token: string | undefined;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi authorizatsiya dan otmagan",
      });
    }

    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: "Token notog'ri" });
    }
  }
}
