import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService) {}

     async createUser(data: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Bu e-posta adresi zaten kayıtlı....');
      }

      // diğer tüm hatalar için genel hata fırlat
      throw new InternalServerErrorException('Bir hata oluştu.');
    }
  }
    async findAllUsers() {
        return this.prisma.user.findMany();
    }            
}
