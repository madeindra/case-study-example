// import axios untuk memanggil API
const axios = require('axios');

// ambil api key dari environment variable
const apiKey = process.env.REACT_APP_API_KEY;

function sendRequest(url = '', method = 'get', body = {}, jwt = null ) {
  // jika diberikan token JWT, buat header Authorization, jika tidak, buat header X-API-KEY 
  const authorization = jwt ? {'Authorization': `Bearer ${jwt}` } : {'X-API-KEY': apiKey};
  
  // gunakan header authorization & content type
  const headers = {
    ...authorization,
    'Content-Type': 'application/json',
  }

  // kirim request & langsung kembalikan
  return axios({
    url,
    method,
    headers,
    data: JSON.stringify(body), // ubah object jadi json
  });
}

export {
  sendRequest,
}