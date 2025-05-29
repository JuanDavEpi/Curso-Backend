const Cart = require('../models/Cart');

class CartsService {
  async createCart() {
    return await Cart.create({});
  }

  async getAllCarts() {
    return await Cart.find().populate('products.product');
  }

  async getCartProducts(cid) {
    return await Cart.findById(cid).populate('products.product');
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    return cart;
  }

  async removeProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  }

  async updateCart(cid, products) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = products;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const product = cart.products.find(p => p.product.toString() === pid);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      return cart;
    }

    return null;
  }

  async deleteCartProducts(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }
}

module.exports = CartsService;
