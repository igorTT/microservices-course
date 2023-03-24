export enum UserRole {
  Teacher = 'Teacher',
  Student = 'Student',
}

export enum PurchasedState {
  Started = 'Started',
  WaitingForPayment = 'WaitingForPayment',
  Purchased = 'Purchased',
  Canceled = 'Canceled',
}

export interface IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export interface IUserCourses {
  courseId: string;
  purchasedState: PurchasedState;
}
