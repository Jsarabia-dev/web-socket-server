
const socketController = ( client ) => {
  console.log(`Client connected id: ${client.id}`);

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('event-msg', ( payload, callback ) => {
    const id = 123456;
    callback( id);
    client.broadcast.emit('event-msg', payload);
  });
};

module.exports = {socketController};
