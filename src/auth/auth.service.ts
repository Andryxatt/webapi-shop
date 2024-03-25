// auth.service.ts
import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs'; 
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    console.log('email', email);

    const user = await this.userService.findOne(email);
    console.log('user', user);
    if (!user) throw new NotFoundException('Email Does not exist');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');
    return user;}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return null;
    }
    const payload = { email: user.email, sub: user.uuid };
    return {
      user: {
        email: user.email,
        uuid: user.uuid,
        roles: user.roles,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    return await this.userService.createUser(registerDto);
  }
  async googleAuth(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  async validateOAuthLogin(email: string): Promise<any> {
    return await this.userService.findOne(email);
  }
  async facebookAuth(req) {
    if (!req.user) {
      return 'No user from facebook';
    }
    return {
      message: 'User information from facebook',
      user: req.user,
    };
  }
  async validateFacebookLogin(email: string): Promise<any> {
    return await this.userService.findOne(email);
  }
}
