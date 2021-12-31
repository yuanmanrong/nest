import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/api/home")
  getHello(@Query() query): string {
    return this.appService.getHello(query);
  }
}
