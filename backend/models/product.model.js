const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  sku: {type: String, required: true},
  name: {type: String, required: true},
  type: {type: String, required: true},
  price: {type: Number, required: true},
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;