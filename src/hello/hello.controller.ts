import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  /**
   * Handler to answer to /hello route
   */
  @Get()
  sayHello(): string {
    return 'world';
  }
}
