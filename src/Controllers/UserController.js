const { User } = require('../models');
const bcrypt = require('bcrypt');

const index = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(201).send(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const roles = ['admin', 'compra', 'venda', 'view', 'seller', 'stockist'];
   const { name, email, password, role } = req.body;
   if (!roles.find((permitedRoles) => role === permitedRoles)) throw new Error('Invalid role');
   const user = await User.create({
     name,
     email,
     password,
     role,
   });
   return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, createdAt, updatedAt } = await User.findByPk(id);
    return res.status(200).json({ id, name, email, role, createdAt, updatedAt });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password, role, isActive } = req.body;
    const { id } = req.params;
    const updatedUser = await User.update(
      { name, email, password, role, isActive },
      { where: { id } },
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return res.status(200).json({ success: 'User updated successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const changePwd = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(password, 8)
    const updatedUser = await User.update(
      { hashedPassword },
      { where: { id } },
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return res.status(200).json({ success: 'User updated successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { index, create, show, update, changePwd };
