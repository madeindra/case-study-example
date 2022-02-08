const secret = process.env.APP_API_SECRET || 'secret';

const apiKey = async (req, res, next) => {
  next();
};

module.exports = apiKey;
