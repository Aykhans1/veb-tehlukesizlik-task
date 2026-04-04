const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// 1. Məlumat bazasını yaradırıq (qovluqda database.db adlı fayl yaranacaq)
const db = new sqlite3.Database('./database.db');

// Baza yarananda cədvəl quraq və içinə adminimizi əlavə edək
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("INSERT OR IGNORE INTO users (id, username, password) VALUES (1, 'admin', '12345')");
});

// 2. Login səhifəsini açır
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 3. Maliyyə Hesabatı (Dashboard) səhifəsini açır
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 4. QƏSDƏN ZƏİF YAZILMIŞ GİRİŞ API-si (SQL Injection Tələsi 😈)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // DİQQƏT: Bu kod qəsdən çox təhlükəli yazılıb! 
    // İstifadəçinin yazdığı mətni birbaşa SQL sorğusuna yapışdırırıq.
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.get(query, (err, row) => {
        if (err) {
            res.json({ success: false, message: 'Baza xətası: ' + err.message });
        } else if (row) {
            res.json({ success: true, message: 'Uğurlu giriş!' });
        } else {
            res.json({ success: false, message: 'İstifadəçi adı və ya şifrə səhvdir!' });
        }
    });
});

// 5. Dashboard üçün qrafik məlumatlarını göndərən API
app.get('/api/report-data', (req, res) => {
    const data = {
        lineChart: {
            labels: ['May', 'İyun', 'İyul', 'Avq', 'Sent', 'Okt'],
            income: [4800, 5000, 4900, 5500, 5100, 5200],
            expense: [2000, 1900, 2500, 2100, 1700, 1750]
        },
        doughnutChart: { categories: [800, 400, 150, 250, 150] }
    };
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server işləyir: http://localhost:3000');
});