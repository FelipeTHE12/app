import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomNestLoggerAdapter
  extends ConsoleLogger
  implements LoggerService
{
  error(message: any, stack?: string, context?: string) {
    super.error(`[${stack}] ${message} `);
  }
}
