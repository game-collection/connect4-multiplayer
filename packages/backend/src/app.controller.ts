import { Controller, Get } from '@nestjs/common';
import {config} from "./config/config";


@Controller()
export class AppController {

  @Get()
  ping(): {ping: string, domain: string} {
    return {
      ping: Date.now().toString(),
      domain: config.server.domain,
    };
  }
}
