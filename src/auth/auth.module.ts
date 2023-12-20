import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { AuthHelper } from "./auth.helper";
import { JwtStrategy } from "./auth.strategy";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", property: "user" }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: "1d" },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
