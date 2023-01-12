import express from 'express';
import getBooks from '../../controllers/books/getBooks';

const userRouter = express.Router();

userRouter.get('/books', getBooks);
// userRouter.get('/me', getCurrentUser);

// userRouter.delete('/:userId', createValidationMiddleware(deleteUserSchema), deleteUser);

// userRouter.post('/upload', upload.single('avatar'), avatarUser);

// userRouter.patch('/:userId', createValidationMiddleware(updateUserSchema), updateUser);

export default userRouter;
