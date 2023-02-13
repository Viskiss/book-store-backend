import { createServer } from 'http';
import type { Socket } from 'socket.io';
import { Server } from 'socket.io';

import type { DefaultEventsMap } from 'node_modules/socket.io/dist/typed-events';
import connectDB from './db/connectToDb';
import config from './config';
import app from './app';
import comment from './controllers/bookStore/comments/addComment';

const connectSocketGetComments = (socket: Socket<DefaultEventsMap>) => {
  socket.on('getComments', async (data) => {
    const returnedComment = await comment.getCommentsWithSocket(data);
    console.log(returnedComment);
    socket.emit('getComments', returnedComment);
  });
};

(async () => {
  try {
    await connectDB();

    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: `${config.server.front}`,
      },
    });

    io.on('connection', (socket) => {
      console.log(socket.id);
    });

    httpServer.listen(config.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Application listening on port ${config.server.port}!`);
    });

    io.on('connection', connectSocketGetComments);
  } catch (err) {
    console.error('Server start failed with: ', err);
    process.exit(1);
  }
})();
