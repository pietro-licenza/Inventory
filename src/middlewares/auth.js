const { decodeToken } = require('../helpers/jwt');
const { User } = require('../models');

async function hasAccess(userId) {
  const user = await User.findByPk(userId);
  return user.isActive;
}

async function tokenValidation(request, response, next) {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new Error('Token must be provided');
    }
    const user = decodeToken(authorization);
    if (!await hasAccess(user.id)) throw new Error('Permission denied, contact the administrator');
    request.userId = user.id;
  } catch (error) {
    return response.status(401).send({ error: error.message });
  }

 return next();
}

module.exports = tokenValidation;
