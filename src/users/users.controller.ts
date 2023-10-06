import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    const userCreate = await this.usersService.create(createUserDto);

    return { message: "Usuário criado com sucesso", user: userCreate }

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const user = await this.usersService.update(id, updateUserDto)

    return { message: "Usuário atualizado com sucesso", user: user }

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    
    const user = await this.usersService.remove(id);

    return { message: "Usuário excluido com sucesso", user: user }
  }

}
