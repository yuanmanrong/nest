import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(query): string {
    return `Hello World!${query.name}`;
  }
}
