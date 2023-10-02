const mongoose = require('mongoose');

const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: '{VALUE} is not a valid URL',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [{ type: ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', userSchema);
