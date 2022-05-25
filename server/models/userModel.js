const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preset = new Schema({
  bpm: {type: Number, required: false},
  beat: {type: Number, required: false},
  synthCount: {type: Number, required: false},
  notes: {type: Array, required: false},
  grid: {type: Array, required: false}
})


const user = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  preset: {type: preset, required: false}
});


module.exports = mongoose.model('userInfo', user);