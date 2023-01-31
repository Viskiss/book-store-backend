import express from 'express';

import auth from '../../middlewares/auth';

import getComments from '../../controllers/comments/getComments';
import addComment from '../../controllers/comments/addComment';

const commentsRouter = express.Router();

commentsRouter.use(auth);

commentsRouter.post('/add', addComment);
commentsRouter.post('/comments/:bookId', getComments);

export default commentsRouter;
