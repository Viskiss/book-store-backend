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

app.use('/api', routes);

app.use('*', (_req, res) => {
  res.sendStatus(404);
});

(async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Application listening on port ${config.port}!`);
    });
  } catch (err) {
    console.error('Server start failed with: ', err);
    process.exit(1);
  }
})();
