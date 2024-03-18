// auth.service.ts
import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs'; 
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))//<--- here
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.userService.findOne(email);
    if (!user) throw new NotFoundException('Email Does not exist');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Password');
    return user;}
  //compare passwordasync comparePasswords(password: string,hashedPassword: string): Promise<any> {return bcrypt.compare(password, hashedPassword).then((isMatch) => {if (isMatch) return true;return false;}).catch((err) => err);}
  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.userService.findOne(email);
  //   if (user) {
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (isPasswordValid) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //   }
  //   return null;
  // }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return null;
    }
    const payload = { email: user.email, sub: user.uuid };
    console.log('payload', this.jwtService.sign(payload));
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // You can implement registration logic here
    // Make sure to hash the password before saving it to the database
    return 'Registration logic here';
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
