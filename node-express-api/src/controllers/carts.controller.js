class CartsController {
  constructor(cartsService) {
    this.cartsService = cartsService;
  }

  async getAllCarts(req, res) {
    try {
      const carts = await this.cartsService.getAllCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: 'Error recuperando carritos', error });
    }
  }

  async createCart(req, res) {
    try {
      const newCart = await this.cartsService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: 'Error creando carrito', error });
    }
  }

  async getCartProducts(req, res) {
    const { cid } = req.params;
    try {
      const products = await this.cartsService.getCartProducts(cid);
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error recuperando productos del carrito', error });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const updatedCart = await this.cartsService.addProductToCart(cid, pid);
      if (updatedCart) {
        res.status(200).json(updatedCart);
      } else {
        res.status(404).json({ message: 'Carrito o producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error añadiendo producto al carrito', error });
    }
  }
}

module.exports = CartsController;
