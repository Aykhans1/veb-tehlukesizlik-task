const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// 📦 DATABASE
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        INSERT OR IGNORE INTO users (username, password)
        VALUES ('admin', '12345')
    `);
});

// 🌐 ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 🔐 LOGIN API (qəsdən zəif - SQL Injection var)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.get(query, (err, row) => {
        if (err) {
            return res.json({ success: false, message: 'Baza xətası' });
        }

        if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Yanlış login' });
        }
    });
});

// 📝 REGISTER API
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Boş ola bilməz' });
    }

    const checkUser = `SELECT * FROM users WHERE username = '${username}'`;

    db.get(checkUser, (err, row) => {
        if (row) {
            return res.json({ success: false, message: 'User artıq var' });
        }

        const insert = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

        db.run(insert, (err) => {
            if (err) {
                return res.json({ success: false, message: 'Xəta baş verdi' });
            }

            res.json({ success: true });
        });
    });
});

// 📊 REPORT DATA
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

// 🚀 SERVER
app.listen(3000, () => {
    console.log('Server işləyir: http://localhost:3000');
});
