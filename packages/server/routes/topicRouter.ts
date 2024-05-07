import { Router } from 'express';
import { topicController } from '../controllers/topicController';
import { topicValidator } from '../middleware/Validator';
import { authMiddleware } from '../middleware/AuthMiddleware';
const topicRouter = Router();

topicRouter.post(
  '/create',
  authMiddleware,
  topicValidator,
  topicController.create
);
topicRouter.get('/getAll', authMiddleware, topicController.getAllTopics);
topicRouter.get('/getOne/:id', authMiddleware, topicController.getTopicById);
export default topicRouter;
