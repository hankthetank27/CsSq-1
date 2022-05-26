const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const preset = new Schema({
  bpm: {type: Number, required: false},
  beat: {type: Number, required: false},
  synthCount: {type: Number, required: false},
  notes: {type: Array, required: false},
  grid: {type: Array, required: false}
})


const user = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  preset: {type: preset, required: false}
});

const SALT_WORK_FACTOR = 10;

user.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    console.log(this.password);
    return next();
  })
})

module.exports = mongoose.model('userInfo', user);