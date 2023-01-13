import express from 'express';
import cors from 'cors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes';
import config from './config';
import './utils/globalUser';
import errorsHandler from './middlewares/errorsHandler';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: config.server.front,
  }),
);
app.use(express.static(__dirname));
app.use('/api', routes);

app.use('*', (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

app.use(errorsHandler);
// setTimeout(() => {
//   bookUp();
// }, 5000);

export default app;
