const ipl = require('./ipl');
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('../data/matches.csv')
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', () => {
    console.log(JSON.stringify(ipl.numOfMatches(results)));

});

