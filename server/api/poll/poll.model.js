'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PollSchema = new mongoose.Schema({
  name: String,
  options: Array,
  createdAt: Date,
  createdBy: String
});

export default mongoose.model('Poll', PollSchema);
