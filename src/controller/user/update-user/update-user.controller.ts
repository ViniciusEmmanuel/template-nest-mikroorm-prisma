import { UserUpdateDTO } from '@core/user/dto/user-update.dto';
import { UpdateUser } from '@core/user/use-cases/update-user';
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Put,
} from '@nestjs/common';
import { LoggerService } from '@providers/logger/logger.service';
import { UnitOfWork } from '@repositories/unit-of-work';

@Controller('user')
export class UpdateUserController {
  private updateUser: UpdateUser;

  constructor(uow: UnitOfWork, private logger: LoggerService) {
    this.updateUser = new UpdateUser(uow);
  }

  @Put()
  @HttpCode(204)
  async execute(@Body() userUpdateDTO: UserUpdateDTO) {
    try {
      const errorOrVoid = await this.updateUser.execute(1, userUpdateDTO);

      if (errorOrVoid.isLeft()) return errorOrVoid.value;
    } catch (error) {
      this.logger.error({ error });

      return new InternalServerErrorException();
    }
  }
}
