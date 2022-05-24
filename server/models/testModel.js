const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const testSchema = new Schema({
  name: {type: String, required: true},
  location: {type: String, required: true}
});


module.exports = mongoose.model('Test', testSchema);