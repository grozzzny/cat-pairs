import { Reply } from '../models/Reply';
import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

class ReplyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId, userId, text } = req.body;
      const reply = await Reply.create({ commentId, userId, text });
      if (!reply) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(reply);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
  async getAllCommentReply(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const replys = await Reply.findAll({ where: { commentId: id } });
    if (!replys) {
      return next(ApiError.internal('Не удалось получить ответы по этому id'));
    }
    return res.json(replys);
  }

  async getReplyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reply = await Reply.findOne({ where: { id } });
      if (!reply) {
        return next(ApiError.internal('Не удалось получить ответ по этому id'));
      }
      return res.json(reply);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
}
export const replyController = new ReplyController();
