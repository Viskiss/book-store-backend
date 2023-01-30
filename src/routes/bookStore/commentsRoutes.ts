import express from 'express';
import addComment from '../../controllers/comments/addComment';

const userRouter = express.Router();

userRouter.post('/add', addComment);

export default userRouter;
