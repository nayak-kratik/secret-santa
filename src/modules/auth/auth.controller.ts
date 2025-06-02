import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authLoginDTO: AuthLoginDTO): Promise<{ isAdmin: boolean }> {
    const isAdmin = await this.authService.validateAdmin(authLoginDTO.email);
    return { isAdmin };
  }
}
