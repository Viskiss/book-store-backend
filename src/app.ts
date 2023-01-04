import express from 'express';
import cors from 'cors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import routes from './routes';
import config from './config';
import './utils/globalUser';
import errorsHandler from './middlewares/errorsHandler';
// import { storageConfig } from './controllers/afterAuth/avatarUser';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: config.server.front,
  }),
);

app.use(express.static(__dirname));
app.use('/api', routes);

app.use('*', (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

app.use(errorsHandler);

export default app;
