const fs = require('fs').promises;
const path = require('path');

class ProductsService {
  constructor() {
    this.path = path.join(__dirname, '../data/products.json');
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
      await this.saveProducts(); // si no existe el archivo, lo crea vacío
    }
  }

  async saveProducts() {
    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }

  async getAll() {
    return this.products;
  }

  async getById(id) {
    return this.products.find(p => String(p.id) === String(id));
  }

  async add(product) {
    const newId = this.products.length > 0
      ? parseInt(this.products[this.products.length - 1].id) + 1
      : 1;

    const newProduct = { id: newId.toString(), ...product };
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async update(id, updatedData) {
    const index = this.products.findIndex(p => String(p.id) === String(id));
    if (index === -1) return null;

    // Evitar sobrescribir el ID
    delete updatedData.id;
    this.products[index] = { ...this.products[index], ...updatedData };
    await this.saveProducts();
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(p => String(p.id) === String(id));
    if (index === -1) return false;

    this.products.splice(index, 1);
    await this.saveProducts();
    return true;
  }
}

module.exports = ProductsService;
// const fs = require('fs').promises;
// const path = require('path');
//
// class ProductsService {
//   constructor() {
//     this.path = path.join(__dirname, '../data/products.json');
//     this.products = [];