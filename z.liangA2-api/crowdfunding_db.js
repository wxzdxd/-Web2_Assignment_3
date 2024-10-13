const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL username
    password: 'qwe#@!123', // MySQL password
    database: 'crowdfunding_db', // database name
    port: 3306 // MySQL port
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('sucess');
});

module.exports = db; // Export the connection
