import { LoggerService, Module } from '@nestjs/common';
import { CustomNestLoggerAdapter } from './custom-nest-logger';

@Module({
  providers: [
    {
      provide: 'LOGGER',
      useFactory: (): LoggerService => {
        return new CustomNestLoggerAdapter();
      },
    },
  ],
  exports: ['LOGGER'],
})
export class LoggerModule {}
