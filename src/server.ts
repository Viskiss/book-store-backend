import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './db/connectToDb';
import config from './config';
import app from './app';
import comment from './controllers/bookStore/comments/addComment';

(async () => {
  try {
    await connectDB();

    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: `${config.server.front}`,
      },
    });

    httpServer.listen(config.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Application listening on port ${config.server.port}!`);
    });

    io.on('connection', comment.socketAddComment);
  } catch (err) {
    console.error('Server start failed with: ', err);
    process.exit(1);
  }
})();
