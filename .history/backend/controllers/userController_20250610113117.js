const { User } = require('../models');







exports.register = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    console.log('REGISTER BODY:', req.body); 

    
    const existingUser = await User.findOne({ where: { user_email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = await User.create({
      user_name,
      user_email,
      user_password,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user (without password encryption)
exports.login = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await User.findOne({ where: { user_email, user_password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'user_name', 'user_email', 'created_at']
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};



// PUT: Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.update(req.body, {
      where: { user_id: id },
      returning: true,
    });
    const updatedUser = await User.findByPk(id); // Get updated user
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
};

// DELETE: Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { user_id: id } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
