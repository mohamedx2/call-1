const express = require('express');
const controller = require('../controllers/controller'); // Import all controllers from ../controllers/controller.js
const User = require('../models/user.model');

const routes = express.Router(); // Create an instance of Express's Router

// Define routes and associate them with the appropriate controller function
routes.post('/login', controller.login); // Route to log in an existing user
routes.post('/signUp', controller.signUp); // Route to sign up a new user
routes.post('/user', controller.verifyToken, async (req, res) => {
  const theUser= await User.findById(req.decodedToken.userId);
  res.send(theUser);
}); // Route to get user details
routes.delete('/users/:id', controller.verifyAdmin, controller.deleteUser); // Route to delete a user
routes.put('/users/:id', controller.verifyToken, controller.updateUser); // Route to update a user
routes.post('/admin', controller.verifyAdmin, controller.getAllUsers);
// Route to get all users by admin
routes.post('/join', controller.sendJoinCodeByEmail); // Route to send join code via email

module.exports = routes; // Export the Router object so it can be used in other files

