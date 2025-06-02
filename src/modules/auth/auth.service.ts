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

  async validateAdmin(email: string): Promise<{ isAdmin: boolean; id: number | null }> {
    const user = await this.userRepository.findOne({ where: { email } });
    const isAdmin = !!user && user.role === 'admin';
    return {
      isAdmin,
      id: isAdmin ? user.id : null,
    };
  }
}
