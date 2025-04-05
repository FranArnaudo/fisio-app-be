import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './professionals/entities/professional.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        entities: [Professional],  // This will find all entity files
        synchronize: true,
        logging: ["query", "error", "schema"],
        // Optionally enable logging to see SQL queries
      }),
      inject: [ConfigService],  // Don't forget to inject the ConfigService
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}