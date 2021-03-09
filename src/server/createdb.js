const { db } = require("./dbconn.js");

function matchesPerYear() {
	return new Promise((resolve, reject) => {
		db.query(
			"select season, count(*) as matches from matches group by season;",
			(err, result, field) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

function extraRunsPerTeam() {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT SUM(extra_runs) as extra, batting_team 
                FROM matches 
            JOIN deliveries 
                ON matches.id = deliveries.match_id 
            WHERE season = 2016 
                GROUP BY batting_team;`,
			(err, result, field) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

function matchesWonPerYear() {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT 
                season,count(winner) as Wins , winner 
            FROM matches 
                GROUP BY season,winner 
                ORDER BY season;`,
			(err, result, field) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

function topTenEconomicBowlers() {
	return new Promise((resolve, reject) => {
		db.query(
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
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

const matchWin = matchesWonPerYear().then(r => console.log(r)).catch(e=>console.error(e));
const matchPlay = matchesPerYear().then(r => console.log(r)).catch(e=>console.error(e));
const extraRun = extraRunsPerTeam().then(r => console.log(r)).catch(e=>console.error(e));
const top10 = topTenEconomicBowlers().then(r => console.log(r)).catch(e=>console.error(e));

module.exports = {
    matchWin,
    matchPlay,
    extraRun,
    top10
}