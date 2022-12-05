import express from 'express';
import cors from 'cors';

import routes from './routes';
import connectDB from './db/connectToDb';
import config from './config';

const app = express();

app.use(
  cors({
    origin: config.postgresDb.host,
  }),
);

app.use(express.json());

app.use('/users', routes);

app.use('*', (_req, res) => {
  res.sendStatus(404);
});

(async () => {
  try {
    await connectDB();

    app.listen(config.postgresDb.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Application listening on port ${config.postgresDb.port}!`);
    });
  } catch (err) {
    console.error('Server start failed with: ', err);
    process.exit(1);
  }
})();
