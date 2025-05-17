import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService) {}

    async createUser(data:CreateUserDto) {
        return this.prisma.user.create({data});
    }
    async findAllUsers() {
        return this.prisma.user.findMany();
    }            
}
