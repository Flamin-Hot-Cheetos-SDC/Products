const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/');

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
    related_product_id: Number,
  });

  const productSchema = new mongoose.Schema({
    id: Number,
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
  const Sku = mongoose.model('Skus', skusSchema); // done
  const Styles = mongoose.model('Styles', stylesSchema); // done
  const Related = mongoose.model('Related', relatedSchema); // parse to convert rows into an array
  const Product = mongoose.model('Product', productSchema); // done
  const Photo = mongoose.model('Photo', photoSchema); // need to implement fix (waiting on lecture)
  const Feature = mongoose.model('Feature', featureSchema); // done
}

main().catch((err) => console.log(err));
