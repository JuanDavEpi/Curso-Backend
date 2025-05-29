const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const http = require('http');

// Rutas
const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const { connectDB } = require('./config/db');
connectDB();

// Manager
const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager();

// App y servidor
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Ruta de vistas
app.use('/', viewsRouter);

// Socket.IO
io.on('connection', socket => {
  console.log('🟢 Nuevo cliente conectado');

  socket.on('nuevoProducto', producto => {
    productManager.createProduct(
      producto.title,
      producto.description,
      producto.code,
      producto.price,
      producto.status,
      producto.stock,
      producto.category,
      producto.thumbnails
    );

    const products = productManager.getAllProducts();
    io.emit('actualizarProductos', { products });
  });

  socket.on('eliminarProducto', id => {
    productManager.deleteProduct(id);

    const products = productManager.getAllProducts();
    io.emit('actualizarProductos', { products });
  });
});

// Puerto
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});
