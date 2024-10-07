const mysql = require( 'mysql2' );

const db = mysql.createConnection({
    host    : process.env.MYSQL_SERVER,
    port    : process.env.MYSQL_PORT,
    user    : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
});

db.connect( (error) => {
    if(error){
        throw error;
    }

});

module.exports = db;