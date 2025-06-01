import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Participant } from '../participants/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Participant])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
