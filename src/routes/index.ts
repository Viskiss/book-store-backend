import express from 'express';

import userRoutesLogin from './user/authRoutes';
import userRoutesLoginAfterAuth from './user/userRoutes';
import bookStoreRoutes from './bookStore/bookRoutes';
import cartRoutes from './bookStore/cartRoutes';
import commentRoutes from './bookStore/commentsRoutes';

const router = express.Router();

router.use('/auth', userRoutesLogin);
router.use('/user', userRoutesLoginAfterAuth);
router.use('/book', bookStoreRoutes);
router.use('/cart', cartRoutes);
router.use('/comment', commentRoutes);

export default router;
