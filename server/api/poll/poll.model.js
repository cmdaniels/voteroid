'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PollSchema = new mongoose.Schema({
  name: String,
  createdAt: Date
});

export default mongoose.model('Poll', PollSchema);
