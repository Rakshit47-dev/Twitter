const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

//  Get all users
router.get('/', userController.getAllUsers);

// Update user
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);
module.exports = router;
