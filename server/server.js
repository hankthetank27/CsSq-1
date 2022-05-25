const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const apiRouter = require('./routes/api');

const PORT = 3000;

//connect to local mongoDB (DONT FORGET TO SO START MONGO)
mongoose.connect('mongodb://localhost:27017/',
{
  dbName: 'cdSoloProject',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database'));

//handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

//uses /dist for static files in webpack production mode
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

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