/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Poll from '../api/poll/poll.model';
import User from '../api/user/user.model';

Poll.find({}).removeAsync()
  .then(() => {
    Poll.create({
      name: 'Which color do you prefer?',
      options: [{
        answer: 'red',
        count: 0
      },{
        answer: 'green',
        count: 0
      },{
        answer: 'blue',
        count: 0
      }],
      createdAt: new Date(),
      createdBy: 'test@example.com'
    }, {
      name: 'Which text editor do you use?',
      options: [{
        answer: 'Sublime Text',
        count: 0
      },{
        answer: 'WebStorm IDE',
        count: 0
      },{
        answer: 'Atom.io',
        count: 0
      },{
        answer: 'Other',
        count: 0
      }],
      createdAt: new Date(),
      createdBy: 'test@example.com'
    }, {
      name: 'How do you prepare your eggs?',
      options: [{
        answer: 'Scrambled',
        count: 0
      },{
        answer: 'Hard Boiled',
        count: 0
      },{
        answer: 'Poached',
        count: 0
      },{
        answer: 'Fried',
        count: 0
      },{
        answer: 'Other',
        count: 0
      }],
      createdAt: new Date(),
      createdBy: 'test@example.com'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('Finished Populating Users');
    });
  });
