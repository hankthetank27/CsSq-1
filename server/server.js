const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const app = express();

const apiRouter = require('./routes/api');

const PORT = 8080;
const mongo = {};

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//uses /dist for static files in webpack production mode
if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, '../dist')));
  mongo.uri = process.env.MONGO_PORT;
} else {
  mongo.uri = 'mongodb://localhost:27017/';
};

//connect to mongoDB
mongoose.connect(mongo.uri, {
    dbName: 'cssq1',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => err ? console.log(err) : console.log('Connected to database')
);

//loads home endpoint
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//handles api endpoints
app.use('/api', apiRouter);

//unknown route handler
app.use((req, res) => res.status(404).send('404, page not found :('));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//starts server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
})

module.exports = app;