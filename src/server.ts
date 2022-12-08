import connectDB from './db/connectToDb';
import config from './config';
import app from './app';

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
