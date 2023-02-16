const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/');

  const skusSchema = new mongoose.Schema({
    styleId: Number,
    skuNumber: Number,
    quantity: Number,
    size: String,
  });

  const stylesSchema = new mongoose.Schema({
    productId: Number,
    name: String,
    sale_price: Number,
    original_price: Number,
    default_style: Number,
  });

  const relatedSchema = new mongoose.Schema({
    current_product_id: Number,
    related_product_id: Number,
  });

  const productSchema = new mongoose.Schema({
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: Number,
  });

  const photoSchema = new mongoose.Schema({
    styleId: Number,
    url: String,
    thumbnail_url: String,
  });

  const cartSchema = new mongoose.Schema({
    user_session: Number,
    product_id: Number,
    active: Number,
  });

  const featureSchema = new mongoose.Schema({
    product_id: Number,
    feature: String,
    value: String,
  });

  // models
  const Sku = mongoose.model('Skus', skusSchema);
  const Styles = mongoose.model('Styles', stylesSchema);
  const Related = mongoose.model('Related', relatedSchema);
  const Product = mongoose.model('Product', productSchema);
  const Photo = mongoose.model('Photo', photoSchema);
  const Cart = mongoose.model('Cart', cartSchema);
  const Feature = mongoose.model('Feature', featureSchema);
}

main().catch((err) => console.log(err));
