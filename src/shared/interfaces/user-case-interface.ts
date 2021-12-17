import { Either } from '@shared/either';
import { IUseCaseError } from './use-case-error.interface';

type Type = unknown;

export interface IUseCase {
  execute(...args: any[]): Promise<Either<IUseCaseError, Type>>;
}
