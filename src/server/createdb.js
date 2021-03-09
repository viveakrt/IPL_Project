const { db } = require("./dbconn.js");

function noOfMatch() {
	return new Promise((resolve, reject) => {
		db.query(
			"SELECT season, count(*) FROM matches GROUP BY season order by 1 asc;",
			(err, result, field) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
					console.log("deliveries table is created");
				}
			}
		);
	});
}




//noOfMatch().then(r => console.log(r)).catch(e=>console.error(e));