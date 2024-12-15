import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';
import { ProfessionalsModule } from '../professionals/professionals.module';

@Module({
  imports: [
    ProfessionalsModule, // Import ProfessionalsModule
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use an environment variable in production
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule], // Export AuthService if needed
})
export class AuthModule {}
