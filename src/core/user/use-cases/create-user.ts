import { IUnitOfWork } from '@repositories/unit-of-work/interfaces/unit-of-work.interfaces';
import { Either, right, left } from '@shared/either';
import { IUseCaseError } from '@shared/interfaces/use-case-error.interface';
import { IUseCase } from '@shared/interfaces/user-case-interface';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UserLogin } from '../entities/user-login.entity';
import { User } from '../entities/user.entity';
import { PhoneNumberExits } from './errors/PhoneNumberExits';

type Result = void;

export class CreateUser implements IUseCase {
  constructor(private uow: IUnitOfWork) {}

  async execute(
    userDto: UserCreateDTO,
  ): Promise<Either<IUseCaseError, Result>> {
    const userExits = await this.uow.userRepository.getByPhone(
      userDto.phoneNumber,
    );

    if (userExits) return left(new PhoneNumberExits());

    const user = User.create(userDto.name, userDto.phoneNumber);

    await this.uow.begin();

    await this.uow.userRepository.save(user);

    const userLogin = UserLogin.create(user, 'android', 'Uberaba-Mg');

    await this.uow.userLoginRepository.save(userLogin);

    await this.uow.commit();

    return right(undefined);
  }
}
