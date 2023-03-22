import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@microservices-course/contracts';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { RMQService } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<
        AccountRegister.Request,
        AccountRegister.Response
      >(AccountRegister.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<
        AccountLogin.Request,
        AccountLogin.Response
      >(AccountLogin.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
