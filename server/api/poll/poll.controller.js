/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/polls              ->  index
 * POST    /api/polls              ->  create
 * GET     /api/polls/:id          ->  show
 * PUT     /api/polls/:id          ->  update
 * DELETE  /api/polls/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Poll = require('./poll.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Polls
export async function index(req, res) {
  var polls = await Poll.find({});
  res.status(200).json(polls);
}

// Gets a single Poll from the DB
export async function show(req, res) {
  var poll = await Poll.findById(req.params.id);
  if (!poll) {
    res.status(404).end();
    return null;
  }
  res.status(200).json(poll);
}

// Creates a new Poll in the DB
export function create(req, res) {
  Poll.create(req.body);
  res.status(201).end();
}

// Updates an existing Poll in the DB
export async function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  var poll = await Poll.findById(req.params.id)
  if (!poll) {
    res.status(404).end();
    return null;
  }
  var updated = _.extend(poll, {options: req.body});
  await Poll.replaceOne({_id: poll._id}, updated);
  res.status(200).json(updated);
}

// Deletes a Poll from the DB
export async function destroy(req, res) {
  var poll = await Poll.findById(req.params.id);
  if (!poll) {
    res.status(404).end();
    return null;
  }
  await Poll.deleteOne({_id: req.params.id})
  res.status(204).end();
}
