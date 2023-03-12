import bcrypt from 'bcryptjs';
import { IUser, UserRole } from '@microservices-course/interfaces';

export class UserEntity implements IUser {
  _id: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
  }

  public async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(password, salt);

    return this;
  }

  public validatePassword(password: string) {
    return bcrypt.compare(password, this.passwordHash);
  }
}
