const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aadyaadi',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed');
        console.log(err);
    } else {
        console.log('Database connected');
    }
});

module.exports = db;