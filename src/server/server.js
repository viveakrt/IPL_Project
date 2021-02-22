const express = require('express');
const fs = require('fs');
const path = require('path');


//init express
const app = express();
const src = path.join(__dirname, '../') + '/public/';
const PORT = process.env.PORT || 5001;

const extraRunPerTeam = JSON.parse(fs.readFileSync(path.join(src + '/output/extraRunsPerTeam.json')));
const matchesPerYear = JSON.parse(fs.readFileSync(path.join(src + '/output/matchesPerYear.json')));
const matchesWonPerYear = JSON.parse(fs.readFileSync(path.join(src + '/output/matchesWonPerYear.json')));
const topTenEconomicalBowlers = JSON.parse(fs.readFileSync(path.join(src + '/output/topTenEconomicalBowlers.json')));


app.get('/api/extras', (req, res) => res.json(extraRunPerTeam));
app.get('/api/match', (req, res) => res.json(matchesPerYear));
app.get('/api/matchwon', (req, res) => res.json(matchesWonPerYear));
app.get('/api/topten', (req, res) => res.json(topTenEconomicalBowlers));

app.use(express.static(path.join(__dirname, '../')+'/client/'));

//Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));