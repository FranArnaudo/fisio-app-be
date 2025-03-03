import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfessionalsService } from '../professionals/professionals.service';
import * as bcrypt from 'bcrypt';
import { CreateProfessionalDto } from 'src/professionals/dto/create-professional.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly professionalsService: ProfessionalsService,
    private readonly jwtService: JwtService,
  ) {
    console.log('JwtService injected successfully:', !!jwtService);
  }

  async register(createProfessionalDto: CreateProfessionalDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      createProfessionalDto.password,
      salt,
    );

    return this.professionalsService.create({
      ...createProfessionalDto,
      password: hashedPassword,
    });
  }

  async validateUser(username: string, password: string) {
    console.log('LOGUEANDO',username)
    const professional =
      await this.professionalsService.findByUsername(username);

    if (
      !professional ||
      !(await bcrypt.compare(password, professional.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return professional;
  }

  async login(professionalLoginData: { username: string; id: string }) {
    console.log('LOGUEANDO',professionalLoginData)
    const professional = await this.professionalsService.findByUsername(
      professionalLoginData.username,
    );
    const payload = {
      ...professional,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
