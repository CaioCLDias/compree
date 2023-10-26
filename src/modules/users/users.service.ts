import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({id: id});

    if(user === null){
      throw new NotFoundException('Usuário não econtrado')
    }

    return user;

  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({email: email});

    
    if(user === null){
      throw new NotFoundException('Usuário não econtrado')
    }

    return user;

  } 

  async create(createUserDto: CreateUserDto) {
    const user = new User();

    Object.assign(user, createUserDto as unknown as User);
    
    await this.userRepository.save(user)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userRepository.delete(id);

    if(user === null){
      throw new NotFoundException('Usuário não econtrado');
    }

    return true;
  }

}
