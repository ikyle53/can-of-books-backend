'use strict';
const mongoose = require('mongoose');
// const { Schema } = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    status: {hasRead: Boolean}
});

const bookModel = mongoose.model('Book', bookSchema);
module.exports = bookModel;