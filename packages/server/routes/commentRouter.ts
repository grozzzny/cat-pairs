import { Router } from 'express';
import { commentController } from '../controllers/commentsController';
import {
  commentEmojiUserXRefValidator,
  commentValidator,
} from '../middleware/Validator';
import { authMiddleware } from '../middleware/AuthMiddleware';

const commentRouter = Router();

commentRouter.post(
  '/create',
  authMiddleware,
  commentValidator,
  commentController.create
);
commentRouter.get(
  '/getAll/:id',
  authMiddleware,
  commentController.getAllTopicComment
);
commentRouter.get(
  '/getOne/:id',
  authMiddleware,
  commentController.getCommentById
);
commentRouter.get(
  '/reaction/:id',
  authMiddleware,
  commentController.getReactions
);
commentRouter.post(
  '/reaction',
  authMiddleware,
  commentEmojiUserXRefValidator,
  commentController.addReaction
);
commentRouter.delete(
  '/reaction',
  authMiddleware,
  commentEmojiUserXRefValidator,
  commentController.deleteReaction
);
export default commentRouter;
