import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({
    secret: 'your-secret-key', 
    signOptions: { expiresIn: '1h' }, 
  }),
  forwardRef(() => UserModule),
  PassportModule 
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
