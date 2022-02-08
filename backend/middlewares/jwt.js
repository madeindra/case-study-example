const secret = process.env.APP_JWT_SECRET || 'secret';

const jwt = async (req, res, next) => {
  next();
};

module.exports = jwt;
