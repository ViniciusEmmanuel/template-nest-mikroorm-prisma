import { plainToClass, Type } from 'class-transformer';
import { IsNumber, validateSync, IsString, IsNotEmpty } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  DATABASE_TYPE!: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_HOST!: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  DATABASE_PORT!: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_USER!: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_NAME!: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
