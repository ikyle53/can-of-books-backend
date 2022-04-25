'use strict';
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URL);

//REQUIRE
const express = require('express');
const app = express();
const Book = require('./modules/book.js');
const cors = require('cors');
const { query } = require('express');


//USE
app.use(cors());

const req = require('express/lib/request');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/', (request, response) => {

  response.send('Welcome to the can of books');

})


app.get('/book', getBooks);
async function getBooks(req, res, next) {
  try {
    let queryObject = {};
    if (req.query.title){
      queryObject.title = req.query.title
    }
    console.log(req.query.title);
    let results = await Book.find(queryObject); //{location: 'Seattle'};
    response.status(200).send(results);
  } catch(error) {
    next(error);
  }
}
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
})

//let queryObject = {};
//if (req.query.hasRead) {
  //queryObject.hasRead = request.query.hasRead;
//}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

