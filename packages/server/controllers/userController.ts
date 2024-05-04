import { User } from '../models/User';
import { ApiError } from '../error/ApiError';
import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import type { MyUserRequest } from '../helpers/types';

const generateJwt = (id: number, userName: string) => {
  return jwt.sign(
    { id: id, userName: userName },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
    }
  );
};

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName } = req.body;
      if (!userName) {
        return next(ApiError.badRequest('Некорректное имя'));
      }
      const candidate = await User.findOne({ where: { userName } });
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким именнем уже существует')
        );
      } else {
        const user = await User.create({ userName });

        const token = generateJwt(user.id, user.userName);
        return res.json({ token });
      }
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName } = req.body;
      const user = await User.findOne({ where: { userName } });
      if (!user) {
        return next(
          ApiError.forbidden('Пользователь с таким именем не найден')
        );
      }

      const token = generateJwt(user.id, user.userName);

      return res.json({ token });
    } catch (e: any) {
      next(ApiError.forbidden(e.message));
    }
  }

  async check(expressRequest: Request, res: Response, next: NextFunction) {
    try {
      const req = expressRequest as MyUserRequest;
      if (!req.user) {
        return next(ApiError.forbidden('Некорректное имя'));
      }
      const token = generateJwt(req.user.id, req.user.userName);
      return res.json({ token });
    } catch (e: any) {
      next(ApiError.forbidden(e.message));
    }
  }

  async getCurrentUser(
    expressRequest: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const req = expressRequest as MyUserRequest;
      if (!req.user) {
        return next(ApiError.badRequest('Не удалось найти пользователя'));
      }
      return res.json(req.user);
    } catch (e: any) {
      next(ApiError.forbidden(e.message));
    }
  }
}

export const userController = new UserController();
