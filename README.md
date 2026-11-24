# Diary App - Pertemuan 9

Aplikasi Diary berbasis React Native dan Expo yang dikembangkan untuk praktikum Pemrograman Mobile Multiplatform. Pada pertemuan ini, aplikasi menerapkan CRUD Diary App - Dasar menggunakan Expo Router, Redux Toolkit, Fetch API, Express.js, dan MySQL.

## Disusun Oleh

**Nama:** Muhamad Dikrulloh  
**NIM:** 2430511076

## Teknologi

- React Native + Expo Router
- Redux Toolkit + React Redux
- Express.js + MySQL
- Fetch API

## Struktur Project

```text
.
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── create.tsx
│   ├── detail/
│   │   └── [id].tsx
│   ├── edit/
│   │   └── [id].tsx
│   └── _layout.tsx
├── src/
│   ├── api.ts
│   ├── diarySlice.ts
│   ├── hooks.ts
│   └── store.ts
└── backend/
    ├── src/
    │   └── server.js
    ├── package.json
    └── schema.sql
```

## Cara Menjalankan

### 1. Backend

```bash
cd backend
npm install
```

Buat file `backend/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=diary_app
```

Jalankan `backend/schema.sql` di MySQL, lalu:

```bash
npm run dev
```

### 2. Frontend

Dari root project:

```bash
npm install
```

Buat file `.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

Jalankan aplikasi:

```bash
npx expo start -c
```

Untuk testing di HP/Expo Go, ganti `localhost` dengan IPv4 laptop.

## Catatan

File `.env`, folder `postman`, `.postman`, `.vscode`, dan `.claude` tidak disertakan ke repository.
