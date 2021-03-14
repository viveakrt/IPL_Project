const express = require('express');
const fs = require('fs');
const path = require('path');
const { database, port } = require('./config');
const {matchWon,match,extras,topTen} = require('./query');


const app = express();
const src = path.join(__dirname, '../') + '/public/';

const extraRunPerTeam = JSON.parse(fs.readFileSync(path.join(src + '/output/extraRunsPerTeam.json')));
const matchesPerYear = JSON.parse(fs.readFileSync(path.join(src + '/output/matchesPerYear.json')));
const matchesWonPerYear = JSON.parse(fs.readFileSync(path.join(src + '/output/matchesWonPerYear.json')));
const topTenEconomicalBowlers = JSON.parse(fs.readFileSync(path.join(src + '/output/topTenEconomicalBowlers.json')));


app.get('/api/extras', (req, res) => {
    extras()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});
app.get('/api/match', (req, res) => {
    match()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});
app.get('/api/matchwon', (req, res) => {
    matchWon()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});
app.get('/api/topten', (req, res) => {
    topTen()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});


app.use(express.static(path.join(__dirname, '../')+'/client/'));

//Listen on a port
app.listen(port, () => console.log(`Server started on port ${port}`));