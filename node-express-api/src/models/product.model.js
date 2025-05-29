const { status } = require('express/lib/response');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
productSchema.plugin(mongoosePaginate);

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String],
});

module.exports = mongoose.model('Product', productSchema);