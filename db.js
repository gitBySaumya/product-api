const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'mysql-2708b008-aadyaadi.g.aivencloud.com',
    user: 'avnadmin',
    password: ' ',
    database: 'aadyaadi',
    port: 18501
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