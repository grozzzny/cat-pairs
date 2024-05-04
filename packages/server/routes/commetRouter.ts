import { Router } from 'express';
import { commentController } from '../controllers/commentsController';
import { commentValidator } from '../middleware/Validator';
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
export default commentRouter;
