const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  quantity: { type: Number, required: true },  // For stock
});

module.exports = mongoose.model('Product', productSchema);
