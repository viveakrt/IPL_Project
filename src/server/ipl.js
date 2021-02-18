function numOfMatches(matches) {

    if (typeof matches !== 'object' || matches.length === 0) {
        return {};
    }
    else {
        
        let yearCount = {};

        matches.forEach(matches => {
            let years = matches.season;

            if (years in yearCount) {
                yearCount[years]++;
            }
            else {
                yearCount[years] = 1;
            }
        });
        return yearCount;

    }
}

function numOfWins(matches) {

    if (typeof matches !== 'object' || matches.length === 0){
        return {};
    }

    else{
        let teams = {};

        matches.forEach(matches => {
            let season=matches.season;
            let winner=matches.winner;
            
            if (teams[season] != undefined) {
                
                if (teams[season][winner] != undefined) {
                    teams[season][winner] += 1;
                } 
                else {
                
                    teams[season][winner] = 1;
                }
            } 
            else {
            
                teams[season] = {};
                teams[season][winner] = 1;
            }
        });
        return teams;
        
    }
}

function extraRunPerTeam(matches,deliveries,year=2016){
    
    let items = {};

    matches.forEach(matches => {

        if (matches.season == year) {

            deliveries.forEach(element => {
                
                if (matches.id == element.match_id) {
                
                    if(items[element.batting_team]) {
                        items[element.batting_team] += Number(element.extra_runs);
                    }
                    else {
                        items[element.batting_team] = Number(element.extra_runs);
                    }
                }
            });
            
        }
        
    });

    return items;
    
}


function topTenEconomicalBowlers(matches, deliveries, year=2015) {
    let bowlerData = {};
    let topBowlers = [];
    let items = {};



    matches.filter(element => element.season == year).forEach(matches => { 

            deliveries.filter(deliveries => matches.id == deliveries.match_id).forEach(element=> {

                    if(bowlerData[element.bowler] != undefined) {

                        bowlerData[element.bowler].balls += 1;
                        bowlerData[element.bowler].total_runs += Number(element.total_runs); 

                    }else {

                        bowlerData[element.bowler] = {};
                        bowlerData[element.bowler].total_runs = Number(element.total_runs);
                        bowlerData[element.bowler].balls = 1;

                    }
                });
        });
        // console.log(bowlerData);
        // [bowlerData].forEach(element => {
        //     console.log(element[1][1]);
        //     let overs = (element.bowler.balls) / 6;
        //     console.log(overs);
        //     let runs = element.total_runs;
        //     console.log(runs);
        //     let economy = runs / overs;
        //     console.log(economy);
        //     topBowlers.push([element.bowler, economy]);
        // });
    for(let bowler in bowlerData) {
        console.log(bowler);
        let overs = (bowlerData[bowler].balls) / 6;
        let runs = bowlerData[bowler].total_runs;
        let economy = runs / overs;

        topBowlers.push([bowler, economy]);
    
    }
// console.log(topBowlers);
    topBowlers.sort((a, b) => a[1] - b[1]);
    // console.log(topBowlers);
    topBowlers.forEach(element => {
        items[element[0]] = element[1];
    });

    return items;

}



module.exports = {
    numOfMatches,
    numOfWins,
    extraRunPerTeam,
    topTenEconomicalBowlers,
};
