const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// public directory is at the project root (sibling of back)
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config from env with sensible defaults for local dev
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_auth',
    multipleStatements: true,
};

const db = mysql.createConnection(dbConfig);
db.connect(function (err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(publicPath, 'register.html'));
});

// Serve the index as the login page (there's no login.html in public)
app.get('/login', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/register', function (req, res) {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const password = req.body.password;
    const email = req.body.email;

    const sql = 'INSERT INTO clients (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, prenom, email, password], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        res.redirect('/login');
    });
});

app.post('/login', function (req, res) {
    const email = req.body.email || req.body.username;
    const password = req.body.password;

    const sql = 'SELECT * FROM clients WHERE email = ? AND password = ?';
    db.query(sql, [email, password], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        if (result.length > 0) {
            res.sendFile(path.join(publicPath, 'accueil.html'));
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

app.post('/objet', function (req, res) {
    const objet = req.body.objet || req.body.name || req.body.nom;
    const prix = req.body.price || req.body.prix;

    if (!objet || !prix) {
        return res.status(400).send('Missing objet or prix');
    }

    const sql = 'INSERT INTO objets (objet, prix) VALUES (?, ?)';
    db.query(sql, [objet, prix], function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Objet ajouté avec succès');
    });
});

// GET /objets - renvoie la liste des objets au format JSON
app.get('/objets', function (req, res) {
    const sql = 'SELECT * FROM objets';
    db.query(sql, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

app.listen(port, function () {
    console.log('Node server is running on port ' + port);
});

