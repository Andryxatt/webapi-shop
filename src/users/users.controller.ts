import { Controller, Body, ClassSerializerInterceptor, Inject, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { User } from "./users.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { UpdateNameDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth } from "@nestjs/swagger";
@Controller("users")
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;
  @Put("username")
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.updateName(body, req);
  }
}
