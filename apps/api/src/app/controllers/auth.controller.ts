import { Controller, Body, Post } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@microservices-course/contracts';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('register')
  async register(@Body() dto: AccountRegister.Request) {}

  @Post('login')
  async login(@Body() { email, password }: AccountLogin.Request) {}
}
