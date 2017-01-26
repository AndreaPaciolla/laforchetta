export interface IUser {
  id: number | string;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  age?: number;
  city?: string;
}
