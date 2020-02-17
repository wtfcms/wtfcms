// see https://docs.nestjs.com/techniques/validation
export const ValidationOptions = {
  forbidNonWhitelisted: true,
  whitelist: true,
  forbidUnknownValues: true,
  transform: true,
};
