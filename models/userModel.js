const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: 'role can only be either admin or user',
      },
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minLength: [4, 'Password is too short!'],
    },
    profilePicture: Buffer,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
