const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  pictureLink: {
    type: String,
  },
    productVariantes:  [{ type: Schema.Types.ObjectId, ref: 'ProductVariant' }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
