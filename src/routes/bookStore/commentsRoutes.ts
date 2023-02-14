import express from 'express';

import auth from '../../middlewares/auth';

import getComments from '../../controllers/bookStore/comments/getComments';
import comment from '../../controllers/bookStore/comments/addComment';

const commentsRouter = express.Router();

commentsRouter.get('/comments/:bookId', getComments);

commentsRouter.post('/add', auth, comment.socketAddComment);

export default commentsRouter;
