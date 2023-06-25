const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./news.db');

app.use(cors());
app.use(express.json());

// Route to list news
app.get('/api/news', (req, res) => {
    db.all('SELECT * FROM news ORDER BY id DESC LIMIT 3', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Route to get details of a single news item
app.get('/api/news/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM news WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
