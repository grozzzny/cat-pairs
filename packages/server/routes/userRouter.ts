import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userNameValidator } from '../middleware/Validator';
import { authMiddleware } from '../middleware/AuthMiddleware';

const userRouter = Router();
userRouter.post(
  '/registration',
  userNameValidator,
  userController.registration
);
userRouter.post('/login', userNameValidator, userController.login);
userRouter.get('/check', authMiddleware, userController.check);
userRouter.get('/me', authMiddleware, userController.getCurrentUser);

export default userRouter;
