class Product {
  constructor(id, title, description, code, price, status, stock, category, thumbnails) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status;
    this.stock = stock;
    this.category = category;
  }
}

module.exports = Product;