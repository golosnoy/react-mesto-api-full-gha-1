const bcrypt = require('bcryptjs');

const User = require('../models/user');

const DuplicateError = require('../errors/DuplicateError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const isValidId = (id) => {
  if (id.split('').length === 24) {
    const pattern = /[0-9a-z]{24}/;
    if (pattern.test(id)) {
      return true;
    }
  }
  return false;
};

const getUsers = (req, res, next) => User.find()
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUserById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    next(new ValidationError('Передан некорректный ID'));
    return;
  }
  User.findById(id)
    .orFail(new Error('Id not found'))
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.message === 'Id not found') {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateError('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => User.findByIdAndUpdate(req.user._id, {
  $set: {
    name: req.body.name,
    about: req.body.about,
  },
}, {
  returnDocument: 'after',
  runValidators: true,
  new: true,
})
  .then((user) => {
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    const {
      name,
      about,
    } = user;
    res.status(200).send({
      name,
      about,
    });
  })
  .catch((err) => {
    next(err);
  });

const updateAvatar = (req, res, next) => User.findByIdAndUpdate(req.user._id, {
  $set: {
    avatar: req.body.avatar,
  },
}, {
  returnDocument: 'after',
})
  .then((user) => res.status(200).send(user))
  .catch(next);

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(new NotFoundError('Id not found'))
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    next(err);
  });

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar, getCurrentUser,
};
