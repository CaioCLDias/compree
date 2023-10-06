import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ListUserDTO } from './dto/list-user.dto';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findAll() {
    //This action returns all users
    const users = await this.userRepository.find();
    const userList = users.map(
      (user) => new ListUserDTO(user.id, user.name)
    );

    return userList;
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({id: id});
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.name = createUserDto.name;

    await this.userRepository.save(user)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

}
