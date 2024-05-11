import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.webUser.id);
      res.json(user ? user : await User.create(req.webUser as Partial<User>));
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.webUser.id);
      if (!user) throw new Error('Пользователь не найден');
      res.json(await user.update(req.webUser));
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
}

export const userController = new UserController();
