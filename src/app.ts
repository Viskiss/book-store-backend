import express from 'express';
import cors from 'cors';
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

import routes from './routes';
import config from './config';
import './utils/globalUser';
import errorsHandler from './middlewares/errorsHandler';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: config.server.front,
  }),
);

app.use(express.json());

app.use('/api', routes);

app.use('*', (_req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send(ReasonPhrases.NOT_FOUND);
});

app.use(errorsHandler);

export default app;
