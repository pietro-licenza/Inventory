const bcrypt = require('bcrypt');
const { User } = require('../models');
const { createToken } = require('../helpers/jwt');

const checkpassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id, hashedPassword, role, isActive, name } = await User.findOne({ where: { email } });
    if (!await checkpassword(password, hashedPassword)) {
      throw new Error('email or password invalid');
    }

    if (!isActive) throw new Error('Permission denied, please contact the administrator');

    const token = createToken({ id, email, role });

    return res.status(200).json({ token, role, name, id });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { create };
