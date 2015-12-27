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
      name: 'Development Tools',
      createdAt: new Date()
    }, {
      name: 'Server and Client integration',
      createdAt: new Date()
    }, {
      name: 'Smart Build System',
      createdAt: new Date()
    }, {
      name: 'Modular Structure',
      createdAt: new Date()
    }, {
      name: 'Optimized Build',
      createdAt: new Date()
    }, {
      name: 'Deployment Ready',
      createdAt: new Date()
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
