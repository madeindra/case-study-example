const secret = process.env.APP_API_SECRET || 'secret';

const apiKey = async (req, res, next) => {
  // ambil key dari header dengan nama X-API-KEY
  const key = req.header('X-API-KEY');

  // jika key kosong atau isi key tidak tidak sesuai dengan secret
  if (!key || key !== secret) {
    // beri response unauthorized
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  // jika key sesuai isi secret, lanjutkan request ke controller
  next();
};

module.exports = apiKey;
