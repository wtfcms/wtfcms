// see https://docs.nestjs.com/techniques/validation

import { ValidationPipeOptions, BadRequestException } from '@nestjs/common';

export const ValidationOptions = {
  forbidNonWhitelisted: false,
  whitelist: true,
  forbidUnknownValues: true,
  transform: true,
  // exceptionFactory: errors => new BadRequestException(errors)
  validateCustomDecorators: true,
} as ValidationPipeOptions;
