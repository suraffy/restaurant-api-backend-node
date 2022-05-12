const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [2, 'Name is too short!'],
    maxLength: [32, 'Name is too long!'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    validate: [validator.isEmail, 'Invalid email!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minLength: [true, 'Password is too short!'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (password) {
        console.log({ password, 'this.password': this.password });
        return password === this.password;
      },
      message: 'Password does not match!',
    },
  },
  profilePicture: Buffer,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
