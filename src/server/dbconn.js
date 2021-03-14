const dotenv = require('dotenv');
const mysql = require("mysql");
const { database } = require('./config');

const db = mysql.createPool(database);

db.getConnection((err) => {
    
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