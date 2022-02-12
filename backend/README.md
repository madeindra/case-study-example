# Detail

Project ini adalah contoh project REST API untuk CRUD To-do dan sudah menerapkan 2 jenis Authorization (API Key & Bearer).

# Cara Menjalankan

## Skema Database 
Buat database dengan skema di bawah sebelum menjalankan project.

### Tabel 'users'
| Column   |  Type   | Constraint  |
|----------|---------|-------------|
| id       | serial  | PRIMARY KEY |
| email    | varchar | UNIQUE      |
| password | varchar | -           |

**Query**
```
CREATE TABLE users (
	id serial PRIMARY KEY,
	email VARCHAR UNIQUE,
	password VARCHAR
);
```

### Tabel 'todos'
| Column |  Type   | Constraint  |
|--------|---------|-------------|
| id     | serial  | PRIMARY KEY |
| title  | varchar | -           |
| detail | varchar | -           |

**Query**
```
CREATE TABLE todos (
	id serial PRIMARY KEY,
	title VARCHAR,
	detail VARCHAR
);
```


## Environment Variable
Buat file `.env` mengikuti format yang ada di file [env.example](./.env.example).

## Menjalankan
Jalankan perintah berikut di terminal

```
npm start
```

# Dokumentasi API
Silahkan import file [postman_collection.json](./postman_collection.json) di Postman.
