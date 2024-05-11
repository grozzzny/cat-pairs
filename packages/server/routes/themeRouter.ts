import { Router } from 'express';
import { themeController } from '../controllers/themeController';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { themeValidator } from '../middleware/Validator';

const themeRouter: Router = Router();
themeRouter.post(
  '/create',
  authMiddleware,
  themeValidator,
  themeController.create
);
themeRouter.get('/getAll', authMiddleware, themeController.getAllThemes);
themeRouter.get('/', authMiddleware, themeController.getUserTheme);
themeRouter.put('/', authMiddleware, themeController.updateUserTheme);
export default themeRouter;
