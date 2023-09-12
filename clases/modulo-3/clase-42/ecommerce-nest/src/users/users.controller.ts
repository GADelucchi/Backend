import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: User) {
    if (!createUserDto.first_name ||
      !createUserDto.email ||
      !createUserDto.password) {
      throw new HttpException('Incompleted data', HttpStatus.BAD_REQUEST)
    }
    return this.usersService.create(createUserDto);
  }

  @Post('/:b')
  tryRequest(@Request() req){
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    return 'All in one object'
  }

  // @Get()
  // findAll(@Query() query) {
  //   const { limit } = query
  //   let users = this.usersService.findAll()
  //   return { status: 'Success', users, limit }
  // }

  @Get()
  findAll(@Query('limit') limit) {
    let users = this.usersService.findAll()
    return { status: 'Success', users, limit }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST)
    }
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
