import { Body, ClassSerializerInterceptor, Controller, HttpException, HttpStatus, Inject, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/users.entity";
import { AuthGuard } from "./auth.guard";
import { RegisterDto, LoginDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post("register")
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }
  @Post("login")
  private login(@Body() body: LoginDto): Promise<{ token: string; user: User }> {
    return this.service.login(body);
  }

  @Post("refresh")
  @UseGuards(AuthGuard)
  private refresh(@Req() { user }: any): Promise<string | never | any> {
    if (!user) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }
    return this.service.refresh(<User>user);
  }
}
