const dotenv = require('dotenv');
const mysql = require("mysql");
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
	if (err) {
		console.error(err);
	}
    else{
	console.log("MySql Connected...");
    }
});

module.exports = { 
    db,
};