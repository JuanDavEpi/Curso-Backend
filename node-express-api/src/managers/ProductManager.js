const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, '../data/products.json');
    this.products = this.loadProducts();
  }

  loadProducts() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
    const data = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(data);
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === parseInt(id));
  }

  createProduct(title, description, code, price, status, stock, category, thumbnails = []) {
    const newProduct = {
      id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updatedFields };
    this.saveProducts();
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    const deleted = this.products.splice(index, 1)[0];
    this.saveProducts();
    return deleted;
  }
}

module.exports = ProductManager;
