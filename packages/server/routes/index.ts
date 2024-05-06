import { Router } from 'express';
import topicRouter from './topicRouter';
import commentRouter from './commentRouter';
import replyRouter from './replyRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/topic', topicRouter);
router.use('/comment', commentRouter);
router.use('/reply', replyRouter);
router.use('/user', userRouter);

export default router;
