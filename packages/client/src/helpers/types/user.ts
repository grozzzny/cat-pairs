import { Theme } from '@/helpers/constants/global';

export interface DataChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface PasswordRequestResult {
  isOk: boolean;
  reason: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface UserServer extends User {
  userTheme: {
    id: number;
    themeId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    theme: {
      id: number;
      theme: Theme;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export type ProfileFieldType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};
