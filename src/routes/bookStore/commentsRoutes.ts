import express from 'express';

import auth from '../../middlewares/auth';

import getComments from '../../controllers/comments/getComments';
import addComment from '../../controllers/comments/addComment';

const commentsRouter = express.Router();

commentsRouter.post('/add', auth, addComment);
commentsRouter.get('/comments/:bookId', getComments);

export default commentsRouter;
