import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import config from './config';
import './db/entities/globalUser';

const app = express();

app.use(
  cors({
    origin: config.postgresDb.host,
  }),
);

app.use(express.json());

app.use('/api', routes);

app.use('*', (_req, res) => {
  res.sendStatus(404);
});

export default app;
