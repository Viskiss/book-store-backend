import express from 'express';

import userRoutesLogin from './beforeAuthRoutes';
import userRoutesLoginAfterAuth from './afterAuthRoutes';

const router = express.Router();

router.use('/login', userRoutesLogin);
router.use('/auth/user', userRoutesLoginAfterAuth);

export default router;
