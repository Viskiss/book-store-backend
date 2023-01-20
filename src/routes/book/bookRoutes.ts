import express from 'express';

import filterBooks from '../../controllers/books/filterBooks';
// import showSelectBook from '../../controllers/books/showSelectBook';
import getBooks from '../../controllers/books/getBooks';
import getGenres from '../../controllers/books/getGenres';

const userRouter = express.Router();

userRouter.get('/filter', filterBooks);
userRouter.get('/books', getBooks);
userRouter.get('/gernes', getGenres);

// userRouter.get('/:bookId', showSelectBook);

// userRouter.delete('/:userId', createValidationMiddleware(deleteUserSchema), deleteUser);

// userRouter.post('/upload', upload.single('avatar'), avatarUser);

// userRouter.patch('/:userId', createValidationMiddleware(updateUserSchema), updateUser);

export default userRouter;
