require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const axios = require('axios');
// const db = require('./db.js');
const db = require('./db.js');
// Serves up all static and generated assets in ../client/dist.
// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// return all documents
app.get('/products', (req, res) => {
  res.end('success');
  // db.returnAll()
  //   .then((documents)=> {
  //     var j = JSON.stringify(documents);
  //     res.end(j);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);








// app.post('/words', (req, res)=> {
  // })

  // app.delete('/words', (req, res) => {
  //   var word = req.body.word;
  //   db.delete(word)
  //   res.end('deleted');
  // })

  // app.put('/words', (req, res) => {
  //   var currentWord = req.body.current;
  //   var newWord = req.body.newWord;
  //   db.edit(currentWord, newWord);
  //   res.send(req.body);
  // })
