import {
  Body,
  Controller,
  HttpCode,
  Post,
  InternalServerErrorException,
} from '@nestjs/common';
import { UnitOfWork } from '@repositories/unit-of-work';
import { CreateUser } from '@core/user/use-cases/create-user';
import { UserCreateDTO } from '@core/user/dto/user-create.dto';
import { LoggerService } from '@providers/logger/logger.service';

@Controller('user')
export class CreateUserController {
  private createUser: CreateUser;

  constructor(uow: UnitOfWork, private logger: LoggerService) {
    this.createUser = new CreateUser(uow);
  }

  @Post()
  @HttpCode(201)
  async execute(@Body() userCreateDTO: UserCreateDTO) {
    try {
      const errorOrVoid = await this.createUser.execute(userCreateDTO);

      if (errorOrVoid.isLeft()) return errorOrVoid.value;
    } catch (error) {
      this.logger.error({ error });

      return new InternalServerErrorException();
    }
  }
}
