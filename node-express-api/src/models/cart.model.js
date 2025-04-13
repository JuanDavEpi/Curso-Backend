class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  getProducts() {
    return this.products;
  }
}

module.exports = Cart;