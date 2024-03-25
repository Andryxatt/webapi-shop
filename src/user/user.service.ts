import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '@auth/dto/auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@utils/role.enum';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ uuid: id });
  }
  async updateUser(id: string, payload: any): Promise<User> {
    const record = await this.userRepository.findOneBy({ uuid: id });
    if (!record) {
      // Handle case where record does not exist
      throw new Error('Record not found');
    }
    // Update the existing record
    Object.assign(record, payload);
    return await this.userRepository.save(record);
  }
  async findOne(email: string): Promise<any> {
    //add relation for roles 
    return await this.userRepository.findOne({ where: { email } });

  }
  async remove(id: string): Promise<any> {
    return await this.userRepository.delete({ uuid: id });
  }


  async create(user: any): Promise<any> {
    const newUser = this.userRepository.create(user);
    return newUser;
  }
  // async createUser(createUserDto: RegisterDto): Promise<User> {
  //   const { password, confirmPassword, ...userData } = createUserDto;
  //   if (password !== confirmPassword) {
  //     throw new BadRequestException('Passwords do not match');
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds as needed

  //   const newUser = this.userRepository.create({
  //     ...userData,
  //     password: hashedPassword, // Store the hashed password
  //   });

  //   return await this.userRepository.save(newUser);
  // }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, confirmPassword, ...userData } = createUserDto;
    if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create(
        {
            ...userData,
            password: hashedPassword,
            roles: [Role.User], // Default role as 'user'
        }
    );

    return await this.userRepository.save(newUser);
}
  async findOneAndUpdate(query: any, payload: any): Promise<User> {
    const record = await this.userRepository.findOne(query);
    if (!record) {
      // Handle case where record does not exist
      throw new Error('Record not found');
    }
    // Update the existing record
    Object.assign(record, payload);
    return await this.userRepository.save(record);
  }

  async findOneAndRemove(query: any): Promise<any> {
    const record = await this.userRepository.findOne(query);
    if (!record) {
      // Handle case where record does not exist
      throw new Error('Record not found');
    }
    return this.userRepository.remove(record);
  }
}
