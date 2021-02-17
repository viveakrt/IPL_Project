function numOfMatches(matches) {
    if (typeof matches !== 'object' || matches.length === 0) {
        return {};
    } else {
        let yearCount = {};

        for (let index = 0; index < matches.length; index++) {
            let years = matches[index].season;
            if (years in yearCount) {
                yearCount[years]++;
            } else {
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
                } else {
                    teams[season][winner] = 1;
                }
            } else {
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


module.exports = {
    numOfMatches,
    numOfWins,
    extraRunPerTeam
};