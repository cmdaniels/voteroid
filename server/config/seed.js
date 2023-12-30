/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Poll from '../api/poll/poll.model';
import User from '../api/user/user.model';

async function seedDatabase() {
  try {
    await Poll.find({});

    await Poll.create({
      name: 'Which color do you prefer?',
      options: [{
        answer: 'Red',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Green',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Blue',
        count: Math.floor(Math.random() * 11)
      }],
      createdAt: new Date(),
      createdBy: 'test@example.com'
    }, {
      name: 'Which text editor do you use?',
      options: [{
        answer: 'Sublime Text',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'WebStorm IDE',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Atom.io',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Other',
        count: Math.floor(Math.random() * 11)
      }],
      createdAt: new Date(),
      createdBy: 'test@example.com'
    }, {
      name: 'How do you prepare your eggs?',
      options: [{
        answer: 'Scrambled',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Hard Boiled',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Poached',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Fried',
        count: Math.floor(Math.random() * 11)
      },{
        answer: 'Other',
        count: Math.floor(Math.random() * 11)
      }],
      createdAt: new Date(),
      createdBy: 'test@example.com'
    });

    await User.find({});

    await User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    });
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

// Call the seedDatabase function
seedDatabase();

console.log('Finished Populating Users');
