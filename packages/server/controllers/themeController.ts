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
    } catch (error: unknown) {
      next(ApiError.internal((error as Error).message));
    }
  }

  async getAllThemes(_req: Request, res: Response, next: NextFunction) {
    try {
      const themes = await SiteTheme.findAll();
      if (!themes.length) throw new Error('Темы не найдены');

      res.status(200).json(themes);
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }

  async getUserTheme(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.webUser.id;
      const user = await User.findById(req.webUser.id, true);

      if (!user) throw new Error(`Пользователь #${userId} не найден`);
      if (!user.userTheme)
        throw new Error(`Тема пользователя #${userId} не найдена`);
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
      const userId = req.webUser.id;
      const themeExists = await SiteTheme.findOne({ where: { theme } });
      if (!themeExists) {
        const siteTheme = await SiteTheme.create({ theme } as SiteTheme);
        await UserTheme.create({ themeId: siteTheme.id, userId } as UserTheme);
        res.json({ message: 'Тема успешно добавлена' });
      } else {
        const userTheme = await UserTheme.findOne({ where: { userId } });
        if (userTheme) {
          await userTheme.update({ themeId: themeExists.id });
          res.json({ message: 'Тема успешно обновлена' });
        } else {
          await UserTheme.create({
            userId,
            themeId: themeExists.id,
          } as UserTheme);
          res.status(200).json({ message: 'Тема успешно добавлена' });
        }
      }
    } catch (error: unknown) {
      next(ApiError.internal((error as Error).message));
    }
  }
}

export const themeController = new ThemeController();
