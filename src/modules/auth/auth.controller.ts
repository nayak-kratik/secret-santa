import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDTO: AuthDTO): Promise<{ isAdmin: boolean; id: number | null }> {
    const admin = await this.authService.getOrCreateAdmin(authDTO);
    return admin;
  }
}
