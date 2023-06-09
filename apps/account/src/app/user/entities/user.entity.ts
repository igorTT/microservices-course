import bcrypt from 'bcryptjs';
import {
  IUser,
  UserRole,
  IUserCourses,
} from '@microservices-course/interfaces';

export class UserEntity implements IUser {
  _id: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses: IUserCourses[];

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.courses = user.courses;
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
