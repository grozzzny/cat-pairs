import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/AuthMiddleware';

const userRouter = Router();
userRouter.get('/create', authMiddleware, userController.create);
userRouter.get('/update', authMiddleware, userController.update);

export default userRouter;
