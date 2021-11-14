// Reference HTML

const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');


const clientSocket = io();
clientSocket.on('connect', () => {
  console.log('Connected');

  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

clientSocket.on('disconnect', () => {
  console.log('Disconnect');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

clientSocket.on('event-msg', (payload) => {
  console.log(payload);
});


btnEnviar.addEventListener('click', () =>{
  const msg = txtMensaje.value;
  
  const payload = {
    msg,
    id: '1234ABC',
    date: new Date().getTime(),
  };
  
  clientSocket.emit('event-msg', payload, (id) => {
    console.log('Desde el server', id);
  });
});
