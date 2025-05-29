const Product = require('../models/Product');

class ProductsService {
  async getAll({ limit = 10, page = 1, sort, query }) {
    const filter = query
      ? { $or: [{ category: query }, { status: query === 'true' }] }
      : {};

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const result = await Product.paginate(filter, {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption
    });

    return result;
  }

  async getById(id) {
    return await Product.findById(id);
  }

  async add(productData) {
    return await Product.create(productData);
  }

  async update(id, updatedFields) {
    return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = ProductsService;
