class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productsService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving products' });
    }
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    try {
      const product = await this.productsService.getById(pid);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving product' });
    }
  }

  async addProduct(req, res) {
    const newProduct = req.body;
    try {
      const createdProduct = await this.productsService.add(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error adding product' });
    }
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    const updatedProduct = req.body;
    try {
      const result = await this.productsService.update(pid, updatedProduct);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating product' });
    }
  }

  async deleteProduct(req, res) {
    const { pid } = req.params;
    try {
      const result = await this.productsService.delete(pid);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product' });
    }
  }
}

module.exports = ProductsController;