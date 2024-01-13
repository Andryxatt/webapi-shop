import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateNameDto } from "./dto/user.dto";
@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: any): Promise<User> {
    const user: User = <User>req.user;

    user.username = body.username;

    return this.repository.save(user);
  }
}
