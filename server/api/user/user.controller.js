'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export async function index(req, res) {
  var users = await User.findAsync({}, '-salt -password');
  res.status(200).json(users);
}

/**
 * Creates a new user
 */
export async function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
  var token = jwt.sign({ _id: newUser._id }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
  res.json({ token });
}

/**
 * Get a single user
 */
export async function show(req, res, next) {
  var userId = req.params.id;

  var user = await User.findByIdAsync(userId);
  if (!user) {
    return res.status(404).end();
  }
  res.json(user.profile);
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function destroy(req, res) {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end();
}

/**
 * Change a users password
 */
export async function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  var user = await User.findById(userId);
  if (user.authenticate(oldPass)) {
    user.password = newPass;
    await user.save();
    res.status(204).end();
  } else {
    res.status(403).end();
  }
}

/**
 * Get my info
 */
export async function me(req, res, next) {
  var userId = req.user._id;

  var user = await User.findOne({ _id: userId }, '-salt -password')
  if (!user) {
    return res.status(401).end();
  }
  res.json(user);
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
