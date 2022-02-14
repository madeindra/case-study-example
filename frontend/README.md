# Detail

Project ini adalah contoh integrasi ReactJS dengan REST API untuk CRUD To-do dengan 2 jenis Authorization (API Key & Bearer).

# Cara Menjalankan
## Environment Variable
Buat file `.env` mengikuti format yang ada di file [env.example](./.env.example).

## Menjalankan
1. Mulai database & backend terlebih dahulu
2. Jalankan perintah berikut di terminal

```
npm start
```

# Alamat Halaman
* `/`: Halaman utama berisi daftar alamat
* `/login`: Halaman login
* `/register`: Halaman register
* `/todo`: Halaman daftar semua todo
* `/todo/create`: Halaman menambah sebuah todo
* `/todo/update/:id`: Halaman mengupdate sebuah todo yang sudah ada