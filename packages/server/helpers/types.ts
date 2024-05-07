import type { Request } from 'express';

export interface User {
  id: number;
  userName: string;
}

export interface MyUserRequest extends Request {
  user: User;
}
export interface CreateThemeRequest {
  theme: string;
}
/*export interface Request extends MyUserRequest {
  user: User
}*/
