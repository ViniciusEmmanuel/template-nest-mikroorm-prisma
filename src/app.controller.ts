import { Controller, Get } from '@nestjs/common';

type Return = { status: string };

@Controller()
export class AppController {
  @Get()
  execute(): Return {
    return { status: 'ok' };
  }
}
