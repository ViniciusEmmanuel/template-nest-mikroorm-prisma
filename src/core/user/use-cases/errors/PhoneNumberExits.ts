import { UnprocessableEntityException } from '@nestjs/common';
import { IUseCaseError } from '@shared/interfaces/use-case-error.interface';

export class PhoneNumberExits
  extends UnprocessableEntityException
  implements IUseCaseError
{
  constructor() {
    super(null, 'Exists phoneNumber, try other number');
  }
}
