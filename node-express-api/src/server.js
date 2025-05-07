const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/views.router'); 

const app = express();
const httpServer = require('http').createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public'))); 

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));


app.use('/', viewsRouter);


io.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  socket.on('nuevoProducto', producto => {

    io.emit('actualizarProductos', { /* productos actualizados */ });
  });

  socket.on('eliminarProducto', id => {

    io.emit('actualizarProductos', { /* productos actualizados */ });
  });
});

// 😢😢 perdio el barca
const PORT = 8080;
httServer.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
