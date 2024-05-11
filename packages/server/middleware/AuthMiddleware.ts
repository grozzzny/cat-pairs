import type { NextFunction, Request, Response } from 'express';
import type { WebUser } from '../helpers/types';
import { ApiError } from '../error/ApiError';

const FORBIDDEN_MESSAGE = 'Пользователь не авторизован';
const AUTH_USER_URL = 'https://ya-praktikum.tech/api/v2/auth/user';
const AUTH_COOKIE_NAME = 'authCookie';

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const cookie = req.headers.cookie;
    if (!cookie || (cookie && !new RegExp(AUTH_COOKIE_NAME).test(cookie))) {
      throw new Error(FORBIDDEN_MESSAGE);
    }

    const response = await fetch(AUTH_USER_URL, { headers: { cookie } });

    if (response.status !== 200) {
      throw new Error(FORBIDDEN_MESSAGE);
    }

    req.webUser = (await response.json()) as WebUser;
    next();
  } catch (e: any) {
    next(ApiError.forbidden(e.message));
  }
};
