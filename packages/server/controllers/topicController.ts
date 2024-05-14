import { Topic } from '../models/Topic';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

class TopicController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicName, description } = req.body;
      const topic = await Topic.create({
        topicName,
        description,
        userId: req.webUser.id,
      });
      if (!topic) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(topic);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await Topic.findAll({ include: [{ model: Comment }] });
      if (!topics) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(topics);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
  async getTopicById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const topic = await Topic.findOne({
        where: { id },
        include: [{ model: Comment, include: [User] }],
      });
      if (!topic) {
        return next(ApiError.internal('Не удалось получить тему по этому id'));
      }
      return res.json(topic);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
}
export const topicController = new TopicController();
