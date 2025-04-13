class CartsController {
  constructor(cartsService) {
    this.cartsService = cartsService;
  }

  async createCart(req, res) {
    try {
      const newCart = await this.cartsService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: 'Error creating cart', error });
    }
  }

  async getCartProducts(req, res) {
    const { cid } = req.params;
    try {
      const products = await this.cartsService.getCartProducts(cid);
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart products', error });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const updatedCart = await this.cartsService.addProductToCart(cid, pid);
      if (updatedCart) {
        res.status(200).json(updatedCart);
      } else {
        res.status(404).json({ message: 'Cart or product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to cart', error });
    }
  }
}

module.exports = CartsController;