const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Halaman Utama (Frontend)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fitur Download Utama
app.get('/download', (req, res) => {
    const videoUrl = req.query.url;
    const type = req.query.type; // mp3, 720, atau 360
    
    if (!videoUrl) return res.status(400).send('Link tidak ditemukan!');

    const downloadDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

    // Template nama file menggunakan judul asli video
    const fileTemplate = path.join(downloadDir, `%(title)s.%(ext)s`);

    // Logika pemilihan kualitas
    let cmd;
    if (type === 'mp3') {
        // Download Audio Saja
        cmd = `yt-dlp -x --audio-format mp3 --add-metadata -o "${fileTemplate}" "${videoUrl}"`;
    } else {
        // Pilih Kualitas Video (720p atau 360p)
        let quality = type === '720' 
            ? "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" 
            : "bestvideo[height<=360][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best";
        
        cmd = `yt-dlp -f "${quality}" -o "${fileTemplate}" "${videoUrl}"`;
    }

    console.log(`[ALFI-DL] Sedang memproses: ${videoUrl} (Format: ${type})`);

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error("Error Detail:", stderr);
            return res.json({ success: false, message: "Gagal memproses video." });
        }

        // Mencari file terbaru yang berhasil diunduh
        const files = fs.readdirSync(downloadDir);
        if (files.length === 0) return res.json({ success: false, message: "File tidak ditemukan." });

        const latestFile = files.map(f => ({
            name: f,
            time: fs.statSync(path.join(downloadDir, f)).mtime.getTime()
        })).sort((a, b) => b.time - a.time)[0].name;

        const filePath = path.join(downloadDir, latestFile);

        console.log(`[ALFI-DL] Selesai! Mengirim: ${latestFile}`);

        // Kirim file ke browser Alfi
        res.download(filePath, latestFile, (err) => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Hapus file di server setelah terkirim
                console.log(`[ALFI-DL] File sementara dihapus dari server.`);
            }
        });
    });
});

app.listen(3000, () => {
    console.log('====================================');
    console.log('   ALFI DOWNLOADER PRO AKTIF!      ');
    console.log('   Akses: http://localhost:3000     ');
    console.log('====================================');
});
