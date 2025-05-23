# MatchSection Football Leagues & Matches

Project ini adalah sebuah komponen React berbasis Next.js yang menampilkan daftar liga sepakbola dengan fitur pagination dan juga daftar pertandingan (matches) berdasarkan matchday tertentu. Data liga diambil dari API Football-Data.org menggunakan fetch API dengan React Hooks (`useEffect` dan `useState`).

## Fitur Utama

- Fetch daftar kompetisi sepakbola dari API Football-Data.org
- Menampilkan daftar liga terbatas berdasarkan kode liga favorit
- Pagination untuk menampilkan 10 liga per halaman
- Menampilkan list pertandingan dengan informasi detail seperti waktu, tim home & away, serta logo tim
- Responsif dengan TailwindCSS
- Handling error fetch API dan kondisi loading (opsional bisa ditambah)
- Menggunakan Environment Variable untuk menyimpan API Key secara aman

## Struktur Komponen

- `MatchSection`: Komponen utama yang menerima props `matches`, `matchday`, dan `teamLogoMap`.
- Fetching API dilakukan di dalam `useEffect` untuk mengambil data liga dan menyimpan ke state `leagues`.
- Pagination state mengatur halaman daftar liga yang ditampilkan.
- Tombol pagination dengan styling yang jelas dan UX yang baik.

## Cara Pakai

1. Clone repository ini.
2. Buat file `.env.local` di root project dan isi dengan API key kamu dari Football-Data.org:

   ```env
   NEXT_PUBLIC_FOOTBALL_API_KEY=your_api_key_here
   ```
3. Jalankan development server:
   ```bash
   npm install
   npm run dev
   ```

4. Import dan gunakan komponen MatchSection di halaman Next.js kamu dengan memberikan props yang diperlukan.
   ```bash
   matches={matchesData} // array data pertandingan
   matchday={currentMatchday} // nomor matchday saat ini
   teamLogoMap={teamLogoMap} // Map dengan key team id dan value url logo
   ```

   ## Disclaimer
   Project ini dibuat untuk tujuan pembelajaran dan pengembangan skill pribadi dalam penggunaan Fetch API, React Hooks, dan integrasi API eksternal.
   Data yang ditampilkan diambil dari Football-Data.org dan tergantung pada API tersebut yang dapat berubah kapan saja. 
   Jangan gunakan API key asli kamu secara publik tanpa perlindungan, selalu gunakan .env.local dan jangan commit API key ke repositori publik.
   Jika ada error fetch API, pastikan API key valid dan API endpoint dapat diakses.
   Project ini bukan aplikasi produksi, melainkan contoh implementasi dan latihan coding.
