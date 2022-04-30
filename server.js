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
app.use(express.json());

const req = require('express/lib/request');
const { response } = require('express');
const verifyUser = require('./auth.js');

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
  verifyUser(req, async (err, user) => {
    if (err) {
      res.sent('invalid token');
    } else {
      try {
        let queryObject = {};
        if (req.query.title) {
          queryObject.title = req.query.title
        }
        console.log(req.query.title);
        let results = await Book.find(queryObject); //{location: 'Seattle'};
        console.log(results);
        res.status(200).send(results);
      } catch (error) {
        next(error);
      }
    }
  });
}

app.post('/book', postBooks);
async function postBooks(req, res, next) {
  console.log(req.body);
  try {
    let createdBook = await Book.create(req.body);
    res.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

app.delete('/book/:id', deleteBook);
async function deleteBook(req, res, next) {
  try {
    let id = req.params.id;
    console.log(req.params.id);
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book was deleted');
  } catch (error) {
    next(error);
  }
}

app.put('/book/:id', putBook);
async function putBook(req, res, next) {
  try {
    let id = req.params.id;
    let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true, overwrite: true });
    res.status(200).send(updatedBook);
  } catch (error) {
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

