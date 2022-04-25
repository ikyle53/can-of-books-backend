'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const bookModel = require('./modules/book.js');

async function seed() {
    await bookModel.create({
        title: 'LOTR',
        description: 'Heroes destroy a ring',
        status: true
    });
    await bookModel.create ({
        title: 'Harry Potter',
        description: 'Boy who lived',
        status: true  
    });
    await bookModel.create ({
        title: 'Bar fight',
        description: 'Rowdy guys at the local tavern',
        status: false  
    });
    console.log("This works");
    mongoose.disconnect();
}

seed();