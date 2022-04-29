const mysql = require('mysql2/promise');
const config = require('./index');

// const db = mysql.createConnection({
//     host : config.host,
//     user : config.user,
//     password : config.password,
//     database : config.database,
// });

// db.connect();


exports.pool = mysql.createPool({
    host : config.mysql.host,
    user : config.mysql.user,
    port : config.mysql.port,
    password : config.mysql.password,
    database : config.mysql.database,
});