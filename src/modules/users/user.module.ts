import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<{
    statusCode: number;
    message: string;
  }> {
    return { statusCode: 123, message: '123' };
  }
}
