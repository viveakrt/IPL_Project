const ipl = require('./ipl.js');
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
const results = [];
const resultDeliveries = [];
const src = path.join(__dirname,'../') + '/public/output/';

fs.createReadStream('../data/matches.csv')
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', () => {

    fs.writeFile(src + 'matchesPerYear.json', JSON.stringify(ipl.numOfMatches(results)) , 'utf8',(err) => {
        if(err) {
            console.log(err);
        }
    });

    fs.writeFile(src + 'matchesWonPerYear.json', JSON.stringify(ipl.numOfWins(results)) , 'utf8',(err) => {
        if(err) {
            console.log(err);
        }
    });

    fs.createReadStream('../data/deliveries.csv')
    .pipe(csv())
    .on('data', (data) => resultDeliveries.push(data))
    .on('end', () => {

        fs.writeFile(src + 'extraRunsPerTeam.json', JSON.stringify(ipl.extraRunPerTeam(results,resultDeliveries)) , 'utf8',(err) => {
            if(err) {
                console.log(err);
            }
        });

    }

    console.log();
});

