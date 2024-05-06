import { Router } from 'express';
import { replyController } from '../controllers/replayController';
import { replyValidator } from '../middleware/Validator';
import { authMiddleware } from '../middleware/AuthMiddleware';
const replyRouter = Router();

replyRouter.post(
  '/create',
  authMiddleware,
  replyValidator,
  replyController.create
);
replyRouter.get(
  '/getAll/:id',
  authMiddleware,
  replyController.getAllCommentReply
);
replyRouter.get('/getOne/:id', authMiddleware, replyController.getReplyById);
export default replyRouter;
