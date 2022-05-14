const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      validate: [validator.isEmail, 'Invalid email!'],
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
      select: false,
    },
    tokens: [{ type: String }],
    profilePicture: Buffer,
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const userObj = this.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ id: this.id }, 'privatekey', { expiresIn: '90d' });

  this.tokens = this.tokens.concat(token);
  await this.save();

  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error();

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error();

  return user;
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
