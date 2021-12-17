export class User {
  id!: number;

  private name: string;

  private phoneNumber: string;

  private email: string | null;

  private constructor(name: string, phoneNumber: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = null;
  }

  static create(name: string, phoneNumber: string) {
    return new User(name, phoneNumber);
  }

  getName(): string {
    return this.name;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getEmail(): string {
    return this.email ?? '';
  }

  setPrincipalInformation(
    name: string,
    phoneNumber: string,
    eventLogger: (description: string, entity: unknown) => void,
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;

    eventLogger.call(null, 'User update principal information', this);
  }

  setEmail(email: string) {
    this.email = email;
  }
}
