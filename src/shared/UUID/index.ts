import * as hyperid from 'hyperid';

export class UUID {
  static get() {
    return hyperid().uuid;
  }
}
