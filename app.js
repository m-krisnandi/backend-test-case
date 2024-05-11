const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Router books
const booksRouter = require('./app/api/v1/books/router')

const v1 = '/api/v1'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to API Backend Test Case'
    })
});

app.use(v1, booksRouter)

module.exports = app;
