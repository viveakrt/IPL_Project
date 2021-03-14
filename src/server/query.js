const { db } = require("./dbconn.js");

function matchesPerYear() {
	return new Promise((resolve, reject) => {
		db.getConnection((err, connection) => {
			if (err) {
				console.log(err);
			} else {
				connection.query(
					"select season, count(*) as matches from matches group by season;",

					(err, result, field) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			}
		});
	});
}

function extraRunsPerTeam() {
	return new Promise((resolve, reject) => {
		db.getConnection((err, connection) => {
			if (err) {
				console.log(err);
			} else {
				connection.query(
					`SELECT SUM(extra_runs) as extra, batting_team 
                FROM matches 
            JOIN deliveries 
                ON matches.id = deliveries.match_id 
            WHERE season = 2016 
                GROUP BY batting_team;`,

					(err, result, field) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			}
		});
	});
}

function matchesWonPerYear() {
	return new Promise((resolve, reject) => {
		db.getConnection((err, connection) => {
			if (err) {
				console.log(err);
			} else {
				connection.query(
					`
            select if(winner='','Draw',winner)as winner,season,count(winner)as Winner 
			from matches 
			group by winner,season 
			order by season;`,

					(err, result, field) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			}
		});
	});
}

function topTenEconomicBowlers() {
	return new Promise((resolve, reject) => {
		db.getConnection((err, connection) => {
			if (err) {
				console.log(err);
			} else {
				connection.query(
					`SELECT 
                (totalRuns / overs) as economy,
                bowler
            FROM (
                SELECT 
                    SUM(total_runs) as totalRuns,
                    bowler,
                    (COUNT(ball) / 6) as overs
                FROM matches
                JOIN deliveries 
                ON matches.id = deliveries.match_id
                WHERE season = 2015
                GROUP BY bowler
            ) tab
            ORDER BY economy
            LIMIT 10;
            `,

					(err, result, field) => {
						connection.release();
						if (err) {
							reject(err);
						} else {
							resolve(result);
						}
					}
				);
			}
		});
	});
}

const matchWon = matchesWonPerYear;
const match = matchesPerYear;
const extras = extraRunsPerTeam;
const topTen = topTenEconomicBowlers;
module.exports = {
	matchWon,
	match,
	extras,
	topTen,
};
