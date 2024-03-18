import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Request, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '@auth/dto/auth.dto';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post('create') 
  async create(@Body() createUserDto: RegisterDto): Promise<any> {
    console.log('createUserDto:', createUserDto);
    try {
      const { email, password, confirmPassword } = createUserDto;
      const isUser = await this.userService.findOne(email);
      if (isUser) {
        throw new ConflictException('User Already Exists');
      }
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.updateUser(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
