const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const handlebars = require('express-handlebars');
const fs = require('fs').promises;

const app = express();
const httpServer = app.listen(8080, () => console.log('Servidor escuchando en puerto 8080'));
const io = new Server(httpServer);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Rutas de vista
app.get('/', async (req, res) => {
  const products = await getProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await getProducts();
  res.render('realTimeProducts', { products });
});

// Función para obtener productos
async function getProducts() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/products.json'), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Función para guardar productos
async function saveProducts(products) {
  await fs.writeFile(path.join(__dirname, 'data/products.json'), JSON.stringify(products, null, 2));
}

// WebSockets
io.on('connection', async (socket) => {
  console.log('Cliente conectado');

  socket.emit('productListUpdated', await getProducts());

  socket.on('newProduct', async (product) => {
    const products = await getProducts();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    product.id = newId;
    products.push(product);
    await saveProducts(products);

    io.emit('productListUpdated', products); // actualiza la lista en todos los clientes
  });
});

