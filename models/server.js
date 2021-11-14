/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
  constructor() {
    this.app    = express();
    this.port   = process.env.SERVER_PORT;
    this.server = require('http').createServer(this.app);
    this.io     = require('socket.io')(this.server);
    // io.on('connection', () => {/* … */});

    // Paths
    this.paths = {};

    // Midlewares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets
    this.sockets();
  }


  middlewares() {
    // CORS
    this.app.use(cors());

    // Public directory
    this.app.use(express.static('public'));

    // FileUpload
    // this.app.use(fileUpload({
    //   useTempFiles: true,
    //   tempFileDir: '/tmp/',
    //   createParentPath: true,
    // }));
  }

  routes() {}

  sockets() {
    this.io.on('connection', socketController );
  }

  listen() {
    this.server.listen(
        this.port,
        () => console.log(`Server Run in port ${this.port}`),
    );
  }
}

module.exports = {
  Server,
};
