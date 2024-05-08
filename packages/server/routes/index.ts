import { Router } from 'express';
import topicRouter from './topicRouter';
import commentRouter from './commentRouter';
import replyRouter from './replyRouter';
import userRouter from './userRouter';
import themeRouter from './themeRouter';

const router = Router();

router.use('/topic', topicRouter);
router.use('/comment', commentRouter);
router.use('/reply', replyRouter);
router.use('/user', userRouter);
router.use('/theme', themeRouter);

export default router;
