const express = require('express');
const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

const app = express();
app.use(express.json());

app.get('/api/products', (req, res) => {
  const products = productManager.getAllProducts();
  res.status(200).json(products);
});

app.get('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(pid);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(product);
});

app.post('/api/products', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const newProduct = productManager.createProduct(title, description, code, price, status, stock, category, thumbnails);
  res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedProduct = productManager.updateProduct(pid, req.body);
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(updatedProduct);
});

app.delete('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const deletedProduct = productManager.deleteProduct(pid);
  if (!deletedProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json({ message: 'Producto eliminado' });
});

app.listen(8080, () => {
  console.log('Servidor en puerto 8080');
});
