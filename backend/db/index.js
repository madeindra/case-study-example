// import client dari pg
const { Client } = require('pg')

// gunakan variable dari env atau gunakan nilai default
const dbHost = process.env.POSTGRES_HOST || 'localhost';
const dbUser = process.env.POSTGRES_USER || 'postgres';
const dbDatabase = process.env.POSTGRES_DATABASE || 'postgres';
const dbPassword = process.env.POSTGRES_PASSWORD || null;
const dbPort = process.env.POSTGRES_PORT || '5432';

// konfigurasi untuk koneksi ke database
const client = new Client({
  host: dbHost,
  user: dbUser,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
});

// fungsi ini akan dipanggil ketika memulai koneksi ke database
const connect = async () => {
  return client.connect();
};

// fungsi ini akan dipanggil oleh fungsi yg membutuhkan koneksi ke database
const getConnection = () => {
  return client;
} 

module.exports = {
  connect,
  getConnection,
}