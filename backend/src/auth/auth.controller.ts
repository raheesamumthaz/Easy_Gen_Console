import { Controller,Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; name: string; password: string }) {
    return this.authService.signUp(body);
  }
  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body);
  }
}
