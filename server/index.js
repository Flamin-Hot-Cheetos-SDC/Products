require('dotenv').config();
const express = require('express');

const app = express();
const db = require('./db');

// app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// TODO figured out how to handle load size (route and query correct but response size too large)
app.get('/products', (req, res) => {
  db.getProducts()
    .then((products) => {
      const r = JSON.stringify(products);
      res.end(r);
    })
    .catch((err) => {
      console.log('unable to process request, with error: ', err);
    });
});

// test endpoint for single product collection
app.get('/products/single/:productId', (req, res) => {
  db.getSingleProduct(req.params.productId)
    .then((productInfo) => {
      console.log('PRODUCT ', productInfo);
      const r = JSON.stringify(productInfo);
      res.end(r);
    })
    .catch((err) => {
      console.log('unable to process request, with error: ', err);
    });
});

// TODO
app.get('/products/:productId/styles', (req, res) => {
  db.getRelated(req.params.productId)
    .then((relatedProducts) => {
      const r = JSON.stringify(relatedProducts[0].relatedProduct);
      res.end(r);
    })
    .catch((err) => {
      console.log('unable to process request, with error: ', err);
    });
});

app.get('/products/:productId', (req, res) => {
  db.getProductInfo(req.params.productId)
    .then((relatedProducts) => {
      const featuresCombined = [];
      relatedProducts.forEach((product) => {
        featuresCombined.push({
          feature: product.feature,
          value: product.value,
        });
      });
      db.getSingleProduct(req.params.productId)
        .then((productInfo) => {
          const responseInfo = {
            id: productInfo[0].id,
            name: productInfo[0].name,
            slogan: productInfo[0].slogan,
            description: productInfo[0].description,
            category: productInfo[0].category,
            default_price: productInfo[0].default_price,
            features: featuresCombined,
          };
          const r = JSON.stringify(responseInfo);
          res.end(r);
        })
        .catch((err) => {
          console.log('unable to get single product: ', err);
        });
    })
    .catch((err) => {
      console.log('unable to process request, with error: ', err);
    });
});

app.get('/products/:productId/related', (req, res) => {
  db.getRelated(req.params.productId)
    .then((relatedProducts) => {
      const r = JSON.stringify(relatedProducts[0].relatedProduct);
      res.end(r);
    })
    .catch((err) => {
      console.log('unable to process request, with error: ', err);
    });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
