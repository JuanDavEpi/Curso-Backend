const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  // ...campos...
});

productSchema.plugin(mongoosePaginate); // ✅ Ahora sí, después del schema

module.exports = mongoose.model('Product', productSchema);