import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateProfessionalDto } from 'src/professionals/dto/create-professional.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createProfessionalDto: CreateProfessionalDto) {
    return await this.authService.register(createProfessionalDto);
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('remember') remember: boolean
  ) {
    const professionalLoginData = await this.authService.validateUser(
      username,
      password,
    );
    return await this.authService.login({...professionalLoginData, remember});
  }
}
