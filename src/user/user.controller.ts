import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/common/pipes/create-user-validaion.pipe';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    @Get()
    GetAllUsers() {
        return this.userService.findAllUsers();
    }

    @Post()
    @UsePipes(new ValidationPipe)
    addUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
