import { Comment } from '../models/Comment';
import { CommentEmojiUserXRef } from '../models/CommentEmojiUserXRef';
import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';
import { Emoji } from '../models/Emoji';

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId, text } = req.body;
      const comment = await Comment.create({
        topicId,
        userId: req.webUser.id,
        text,
      });
      if (!comment) {
        return next(ApiError.internal('Ошибка сервера'));
      }
      return res.json(comment);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async getAllTopicComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const comments = await Comment.findAll({ where: { topicId: id } });
      if (!comments) {
        return next(
          ApiError.internal('Не удалось получить комметарии по этому id')
        );
      }
      return res.json(comments);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const comment = await Comment.findOne({ where: { id } });
      if (!comment) {
        return next(
          ApiError.internal('Не удалось получить комментарии по этому id')
        );
      }
      return res.json(comment);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async getReactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const reactions = await CommentEmojiUserXRef.findOne({
        where: { commentId: id },
        include: [{ model: Emoji, required: true }],
      });
      if (!reactions) {
        return next(
          ApiError.internal('Не удалось получить реакции по этому id')
        );
      }
      return res.json(reactions);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async addReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.webUser.id;
      const { commentId, emojiId } = req.body;
      const reaction = await CommentEmojiUserXRef.create({
        userId,
        commentId,
        emojiId,
      });
      if (!reaction) {
        return next(ApiError.internal('Не удалось добавить реакцию'));
      }
      return res.json(reaction);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }

  async deleteReaction(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.webUser.id;
      const { commentId, emojiId } = req.body;
      const reaction = await CommentEmojiUserXRef.destroy({
        where: { userId, commentId, emojiId },
      });
      if (!reaction) {
        return next(ApiError.internal('Не удалось удалить реакцию'));
      }
      return res.json(reaction);
    } catch (e: any) {
      next(ApiError.internal(e.message));
    }
  }
}
export const commentController = new CommentController();
