const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products');

// Schema
const skusSchema = new mongoose.Schema({
  id: Number,
  style_id: Number,
  size: String,
  quantity: Number,
});

const stylesSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Number,
});

const relatedSchema = new mongoose.Schema({
  current_product_id: Number,
  relatedProduct: Array,
});

const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
});

const photoSchema = new mongoose.Schema({
  id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String,
});

const featureSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String,
});

// models
const Sku = mongoose.model('Skus', skusSchema);
const Styles = mongoose.model('Styles', stylesSchema);
const Related = mongoose.model('relatedCombined', relatedSchema, 'relatedCombined');
const Product = mongoose.model('product', productSchema, 'product');
const Photo = mongoose.model('Photo', photoSchema);
const Feature = mongoose.model('feature', featureSchema, 'feature');

module.exports = {
  getProducts: () => Product.find({}),
  getRelated: (id) => Related.find({ current_product_id: id }),
  getProductInfo: (id) => {
    const features = Feature.find({ product_id: id });
    return features;
  },
  getSingleProduct: (prodId) => {
    console.log('prodId ', prodId);
    return Product.find({ product_id: prodId });
  },
};
