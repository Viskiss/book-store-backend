import express from 'express';

import userRoutesLogin from './loginUserRoutes';
import userRoutesLoginAfterAuth from './userRoutes';

const router = express.Router();

router.use('/login', userRoutesLogin);
router.use('/auth/user', userRoutesLoginAfterAuth);

export default router;
