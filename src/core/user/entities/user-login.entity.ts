import { User } from './user.entity';

export class UserLogin {
  id!: number;

  userId: number;

  device: string;

  location: string | null;

  private constructor(
    userId: number,
    device: string,
    location: string | null = null,
  ) {
    this.userId = userId;
    this.device = device;
    this.location = location;
  }

  static create(user: User, device: string, location: string | null) {
    return new UserLogin(user.id, device, location);
  }
}
