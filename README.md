# 🚀 Alfi Downloader Pro

Alfi Downloader Pro adalah website sederhana berbasis Node.js yang dijalankan melalui Termux untuk mengunduh video dari YouTube dan Facebook menjadi format MP3 atau MP4 dengan berbagai kualitas (360p & 720p).

## ✨ Fitur
- **Judul Otomatis**: Nama file hasil unduhan sesuai dengan judul asli video.
- **Multi-Format**: Pilih antara MP3 (Audio), MP4 360p, atau MP4 720p (HD).
- **Auto-Delete**: Server otomatis menghapus file setelah dikirim ke browser untuk menghemat memori HP.
- **Tampilan Modern**: Antarmuka responsif dengan gaya Glassmorphism.

## 🛠️ Cara Penginstalan di Termux

Pastikan kamu sudah memberikan izin penyimpanan dengan perintah `termux-setup-storage`.

### 1. Update & Install Package
```
pkg update && pkg upgrade
pkg install nodejs-lts python ffmpeg -y
pip install yt-dlp
```

```
git clone https://github.com/Fitunnel/YTFB-Downloader
```

```
cd YTFB-Downloader
```

```
mkdir downloads
npm install
```

### 2. Jalankan scriptnya 
```
node server.js
```

### 3. Mematikan scriptnya
```
CTRL+C
```
