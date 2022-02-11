// import library
import React, { useState } from 'react';

// import fungsi buatan untuk kirim request
import { sendRequest } from '../utils/fetch';

// ambil alamat api dari environment variable
const baseUrl = process.env.REACT_APP_API_URL;

// halaman register
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // kirim form register
  async function handleRegister(e) {
    // jangan refresh halaman ketika form disubmit
    e.preventDefault();
  
    // bikin request body
    const data = {
      email,
      password,
    }
  
    // kirim request
    try {
      const result = await sendRequest(`${baseUrl}/api/registration`, 'post', data);
      
      // jika register berhasil
      if (result.data) {
        window.alert(result.data.message);
      }
    } catch (err) {
      // jika gagal, tampilkan pesan error dari response api
      window.alert(err.response.data.message);
    }
  }

  return (
    <div>
      <p>Register</p>


      <form onSubmit={handleRegister}>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;