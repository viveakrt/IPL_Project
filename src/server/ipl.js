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

function extraRunPerTeam(){

}


module.exports = {
    numOfMatches,
    numOfWins,
    extraRunPerTeam
};