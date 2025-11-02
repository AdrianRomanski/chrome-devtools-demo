import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.appService.register(registerDto);
  }

  @Get('users')
  getAllUsers() {
    return this.appService.getAllUsers();
  }
}
