import { Router } from 'express';

import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

// Deprecated Routes
// router.get('/', userController.index);
// router.get('/:id', userController.show);

export default router;
