import * as http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
const io = new Server(server);

const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Socket.IO server listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);
  const ID = socket.handshake.query.ID;
  socket.join(ID as string);

  socket.on(
    'send-message',
    ({ recipients, text }: { recipients: string[]; text: string }) => {
      recipients.forEach((recipient) => {
        //Remove the current recipient from the list of recipients
        const newRecipients = recipients.filter((r) => r !== recipient);

        //Add the sender to the list of recipients
        newRecipients.push(ID as string);

        socket.broadcast.to(recipient).emit('receive-message', {
          recipients: newRecipients,
          sender: ID,
          text,
        });
      });
    }
  );
});
