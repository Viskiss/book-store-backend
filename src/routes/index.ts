import express from 'express';

import userRoutesLogin from './beforeAuthRoutes';
import userRoutesLoginAfterAuth from './afterAuthRoutes';
import bookStoreRoutes from './bookRoutes';

const router = express.Router();

router.use('/login', userRoutesLogin);
router.use('/auth/user', userRoutesLoginAfterAuth);
router.use('/book-store', bookStoreRoutes);

export default router;
