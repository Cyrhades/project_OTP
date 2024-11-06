const mysql = require('mysql2/promise');

let db;

async function getDbConnection() {
    if (!db) {
        db = await mysql.createConnection({
            host: 'db',
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "",
            database: process.env.MYSQL_DATABASE || "dom_clobbering"
        });
    }
    return db;
}

module.exports = { getDbConnection };