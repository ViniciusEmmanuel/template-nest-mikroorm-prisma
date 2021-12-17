import { NotFoundException } from '@nestjs/common';
import { IUnitOfWork } from '@repositories/unit-of-work/interfaces/unit-of-work.interfaces';
import { Either, right, left } from '@shared/either';
import { IUseCaseError } from '@shared/interfaces/use-case-error.interface';
import { IUseCase } from '@shared/interfaces/user-case-interface';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { PhoneNumberExits } from './errors/PhoneNumberExits';

type Result = void;

export class UpdateUser implements IUseCase {
  constructor(private uow: IUnitOfWork) {}

  async execute(
    userId: number,
    userDto: UserUpdateDTO,
  ): Promise<Either<IUseCaseError, Result>> {
    const user = await this.uow.userRepository.getById(userId);

    if (!user) return left(new NotFoundException());

    const existsPhoneNumber = await this.uow.userRepository.getByPhone(
      userDto.phoneNumber,
    );

    if (existsPhoneNumber && existsPhoneNumber.id !== user.id) {
      return left(new PhoneNumberExits());
    }

    user.setPrincipalInformation(
      userDto.name,
      userDto.phoneNumber,
      (...args) => {
        console.log(args);
      },
    );
    if (userDto.email) user.setEmail(userDto.email);

    await this.uow.begin();
    await this.uow.userRepository.save(user);
    await this.uow.commit();

    return right(undefined);
  }
}
