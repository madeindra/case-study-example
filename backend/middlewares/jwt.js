const jsonwebtoken = require('jsonwebtoken');
const secret = process.env.APP_JWT_SECRET || 'secret';

const jwt = async (req, res, next) => {
  // ambil token dari header dengan nama Authorization
  const token = req.header('Authorization');

  // jika token kosong
  if (!token) {
    // beri response unauthorized
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  // jika token ada, lakukan validasi token menggunakan secret
  jsonwebtoken.verify(token, secret, (err, decoded) => {
    // jika terjadi error (karena token tidak valid)
    if (err) {
      // beri response unauthorized
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    // jika token valid, lanjutkan request ke controller
    next();
  });
};

module.exports = jwt;
