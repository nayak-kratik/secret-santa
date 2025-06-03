import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/user.entity';
import { AuthDTO } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOrCreateAdmin(authDTO: AuthDTO): Promise<{ isAdmin: boolean; id: number | null }> {
    let user = await this.userRepository.findOne({ where: { email: authDTO.email } });
    if (!user) {
      user = this.userRepository.create({
        email: authDTO.email,
        name: 'Admin',
        role: UserRole.ADMIN,
      });
      user = await this.userRepository.save(user);
    }
    const isAdmin = user.role === UserRole.ADMIN;
    return {
      isAdmin,
      ...user,
    };
  }
}
