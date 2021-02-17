function numOfMatches(matches) {

    if (typeof matches !== 'object' || matches.length === 0) {
        return {};
    } 
    else {
        
        let yearCount = {};

        for (let index = 0; index < matches.length; index++) {
            let years = matches[index].season;

            if (years in yearCount) {
                yearCount[years]++;
            }
            else {

                yearCount[years] = 1;
            }
        }
        return yearCount;

    }
}

function numOfWins(matches) {
    if (typeof matches !== 'object' || matches.length === 0){
        return {};
    }

    else{
        let teams = {};

        for (let index=0; index < matches.length; index++) {

            let season=matches[index].season;
            let winner=matches[index].winner;
            
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
        }
        return teams;
    }
}

function extraRunPerTeam(matches,deliveries,year=2016){
    
    let items = {};

    for (let index=0; index < matches.length; index++) {
        let season = matches[index].season;

        if (season == year) {
            let id = matches[index].id;

            for (let indexDel=0; indexDel < deliveries.length; indexDel++) {

                let matchId = deliveries[indexDel].match_id;
                
                if (id == matchId) {
                    let battingTeam = deliveries[indexDel].batting_team;
                
                    if(items[battingTeam]) {
                        items[battingTeam] += Number(deliveries[indexDel].extra_runs);
                
                    }else {
                
                        items[battingTeam] = Number(deliveries[indexDel].extra_runs);
                    }
                }
            }
        }
    }
    return items;
}


function topTenEconomicalBowlers(matches, deliveries, year=2015) {
    let bowlersData = {};
    let topEconomicalBowlers = [];
    let items = {};
    
    for (let index=0; index < matches.length; index++) {
        let season = matches[index].season;

        if (season == year) {
            let id = matches[index].id;

            for (let indexDel=0; indexDel < deliveries.length; indexDel++) {

                let matchId = deliveries[indexDel].match_id;
                
                if (id == matchId) {
                    let bowler = deliveries[indexDel].bowler;
                    
                    if (bowlersData[bowler] != undefined) {
                        
                        bowlersData[bowler].balls += 1;
                        bowlersData[bowler].total_runs += Number(deliveries[indexDel].total_runs)
                        
                    }else {
                        
                        bowlersData[bowler] = {};
                        bowlersData[bowler].total_runs = Number(deliveries[indexDel].total_runs)
                        bowlersData[bowler].balls = 1;

                    }
                }
            }
        }
    }

    for(let bowler in bowlersData) {
        
        let overs = (bowlersData[bowler].balls) / 6;
        let runs = bowlersData[bowler].total_runs;
        let economy = runs / overs;

        topEconomicalBowlers.push([bowler, economy]);
    
    }

    topEconomicalBowlers.sort((a, b) => a[1] - b[1]);
    for (let index of topEconomicalBowlers.slice(0,10)) {
        items[index[0]] = index[1];
    }

    return items;


}



module.exports = {
    numOfMatches,
    numOfWins,
    extraRunPerTeam,
    topTenEconomicalBowlers,
};
