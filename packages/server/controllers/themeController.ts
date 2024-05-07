import type { NextFunction, Request, Response } from 'express';
import { SiteTheme } from '../models/SiteTheme';
import { UserTheme } from '../models/UserTheme';
import { ApiError } from '../error/ApiError';
import type { CreateThemeRequest } from '../helpers/types';
import { User } from '../models/User';

class ThemeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { theme } = req.body as CreateThemeRequest;

      const existingTheme = await SiteTheme.findOne({ where: { theme } });
      if (existingTheme) throw new Error('Тема уже существует');

      const newTheme = new SiteTheme();
      newTheme.theme = theme;
      await newTheme.save();

      res
        .status(201)
        .json({ message: 'Тема успешно добавлена', theme: newTheme });
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }
  async getAllThemes(_req: Request, res: Response, next: NextFunction) {
    try {
      const themes = await SiteTheme.findAll();
      if (themes.length === 0) throw new Error('Темы не найдены');

      res.status(200).json(themes);
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }

  async getUserTheme(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId },
        include: [{ model: UserTheme, include: [SiteTheme] }],
      });

      if (!user)
        throw new Error(`Пользователь #${req.params.userId} не найден`);
      if (!user.userTheme)
        throw new Error(`Тема пользователя #${req.params.userId} не найдена`);
      if (!user.userTheme.theme)
        throw new Error(`Тема #${user.userTheme.themeId} не найдена`);

      res.status(200).json(user.userTheme.theme);
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }
  async updateUserTheme(req: Request, res: Response, next: NextFunction) {
    try {
      const { theme } = req.body;
      const { userId } = req.params;
      const id = Number(userId);
      const themeExists = await SiteTheme.findOne({ where: { theme: theme } });

      if (!themeExists) {
        return next(ApiError.internal('Тема не найдена'));
      }

      const userTheme = await UserTheme.findOne({ where: { userId: id } });

      if (userTheme) {
        await userTheme.update({ themeId: themeExists.id });
        return res.status(200).json({ message: 'Тема успешно обновлена' });
      } else {
        await UserTheme.create({
          userId: id,
          themeId: themeExists.id,
        } as UserTheme);
        return res.status(200).json({ message: 'Тема успешно добавлена' });
      }
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }
}

export const themeController = new ThemeController();
