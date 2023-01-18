import express from 'express';

import showSelectBook from '../../controllers/books/showSelectBook';
import getBooks from '../../controllers/books/getBooks';
import getGenres from '../../controllers/books/getGenres';
import filterGenre from '../../controllers/books/fiterGenre';

const userRouter = express.Router();

userRouter.get('/books', getBooks);
userRouter.get('/gernes', getGenres);

userRouter.get('/:bookId', showSelectBook);

userRouter.get('/:books/:filter', filterGenre);

// userRouter.delete('/:userId', createValidationMiddleware(deleteUserSchema), deleteUser);

// userRouter.post('/upload', upload.single('avatar'), avatarUser);

// userRouter.patch('/:userId', createValidationMiddleware(updateUserSchema), updateUser);

export default userRouter;
