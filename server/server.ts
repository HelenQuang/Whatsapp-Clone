import { Server } from 'socket.io';

const io = new Server(7000, { cors: { origin: ['http://localhost:3000'] } });

io.on('connection', (socket) => {
  const ID = socket.handshake.query.ID;
  console.log(`Client ${ID} connected`);

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
