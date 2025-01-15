const mongoose = require('mongoose');


const ProductVariantSchema = new mongoose.Schema({
  attributeName: {
    type: String,
    required: true,
  }
});

const ProductVariant = mongoose.model('ProductVariant', ProductVariantSchema);

module.exports = ProductVariant;
