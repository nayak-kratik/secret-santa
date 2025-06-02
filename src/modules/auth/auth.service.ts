import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateAdmin(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user && user.role === 'admin';
  }
}
