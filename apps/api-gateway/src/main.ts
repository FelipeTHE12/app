import { NestFactory } from '@nestjs/core';
import momentTimezone from 'moment-timezone';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(3000);
}
bootstrap();
