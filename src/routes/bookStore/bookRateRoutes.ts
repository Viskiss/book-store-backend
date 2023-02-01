import express from 'express';

import addRateBook from '../../controllers/bookRate/addRatingBook';
import getRateBook from '../../controllers/bookRate/getRatingBooks';

import auth from '../../middlewares/auth';

const rateRouter = express.Router();

rateRouter.use(auth);

rateRouter.post('/add', addRateBook);
rateRouter.get('/rate/:userId/:bookId', getRateBook);

export default rateRouter;
