import type { NextFunction, Request, Response } from 'express';
import { SiteTheme } from '../models/SiteTheme';
import { UserTheme } from '../models/UserTheme';
import { ApiError } from '../error/ApiError';
import type { CreateThemeRequest } from '../helpers/types';

class ThemeController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { theme, description } = req.body as CreateThemeRequest;

      const existingTheme = await SiteTheme.findOne({ where: { theme } });
      if (existingTheme) {
        return next(ApiError.internal('Тема уже существует'));
      }

      const newTheme = new SiteTheme();
      newTheme.theme = theme;
      newTheme.description = description;
      await newTheme.save();

      res
        .status(201)
        .json({ message: 'Тема успешно добавлена', theme: newTheme });
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }
  async getAllThemes(_: any, res: Response, next: NextFunction) {
    try {
      const themes = await SiteTheme.findAll();
      res.status(200).json(themes);
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }

  async getUserTheme(req: Request, res: Response, next: NextFunction) {
    try {
      const userTheme = await UserTheme.findOne({
        where: { userId: req.params.userId },
      });
      const siteTheme = await SiteTheme.findOne({
        where: { theme: userTheme?.theme || 'light' },
      });
      res.status(200).json(siteTheme);
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
        await userTheme.update({ theme });
        return res.status(200).json({ message: 'Тема успешно обновлена' });
      } else {
        await UserTheme.create({ userId: id, theme } as UserTheme);
        return res.status(200).json({ message: 'Тема успешно создана' });
      }
    } catch (error: any) {
      next(ApiError.internal(error.message));
    }
  }
}

export const themeController = new ThemeController();
