import express from 'express';

import userRoutesLogin from './user/authRoutes';
import userRoutesLoginAfterAuth from './user/userRoutes';
import bookStoreRoutes from './book/bookRoutes';

const router = express.Router();

router.use('/auth', userRoutesLogin);
router.use('/user', userRoutesLoginAfterAuth);
router.use('/book', bookStoreRoutes);

export default router;
