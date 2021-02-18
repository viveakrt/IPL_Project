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
        // for(let index = 0; index < matches.length; index++) {
        //     let years = matches[index].season;

        //     if (years in yearCount) {
        //         yearCount[years]++;
        //     }
        //     else {
        //         yearCount[years] = 1;
        //     }
        // }
        

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
        // for (let index=0; index < matches.length; index++) {

        //     let season=matches[index].season;
        //     let winner=matches[index].winner;
            
        //     if (teams[season] != undefined) {
                
        //         if (teams[season][winner] != undefined) {
        //             teams[season][winner] += 1;
        //         } 
        //         else {
                
        //             teams[season][winner] = 1;
        //         }
        //     } 
        //     else {
            
        //         teams[season] = {};
        //         teams[season][winner] = 1;
        //     }
        // }
        
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
    // for (let index=0; index < matches.length; index++) {
    //     let season = matches[index].season;

    //     if (season == year) {

    //         let id = matches[index].id;

    //         for (let indexDel=0; indexDel < deliveries.length; indexDel++) {
                
    //             let matchId = deliveries[indexDel].match_id;
                
    //             if (id == matchId) {

    //                 let battingTeam = deliveries[indexDel].batting_team;
                
    //                 if(items[battingTeam]) {
    //                     items[battingTeam] += Number(deliveries[indexDel].extra_runs);
    //                 }
    //                 else {
    //                     items[battingTeam] = Number(deliveries[indexDel].extra_runs);
    //                 }
    //             }
    //         }
    //     }
    // }
    
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


        // matches.forEach(matches => {

        //     if (matches.season == year) {
    
        //         deliveries.forEach(element => {
                    
        //             if (matches.id == element.match_id) {

        //                 let bowler = deliveries.bowler;
        //                 if (bowlersData[bowler]) {
                        
        //                 bowlersData[bowler].balls += 1;
        //                 bowlersData[bowler].total_runs += Number(deliveries.total_runs);
                        
        //                 }else {
                        
        //                 bowlersData[bowler] = {};
        //                 bowlersData[bowler].total_runs = Number(deliveries.total_runs);
        //                 bowlersData[bowler].balls = 1;

        //                 }
        //             }
        //         });
        //     }
        // });

    // for (let index=0; index < matches.length; index++) {
    //     let season = matches[index].season;

    //     if (season == year) {
    //         let id = matches[index].id;

    //         for (let indexDel=0; indexDel < deliveries.length; indexDel++) {

    //             let matchId = deliveries[indexDel].match_id;
                
    //             if (id == matchId) {
    //                 let bowler = deliveries[indexDel].bowler;
                    
    //                 if (bowlersData[bowler] != undefined) {
                        
    //                     bowlersData[bowler].balls += 1;
    //                     bowlersData[bowler].total_runs += Number(deliveries[indexDel].total_runs);
                        
    //                 }else {
                        
    //                     bowlersData[bowler] = {};
    //                     bowlersData[bowler].total_runs = Number(deliveries[indexDel].total_runs);
    //                     bowlersData[bowler].balls = 1;

    //                 }
    //             }
    //         }
    //     }
    // }

    for(let bowler in bowlerData) {

        let overs = (bowlerData[bowler].balls) / 6;
        let runs = bowlerData[bowler].total_runs;
        let economy = runs / overs;

        topBowlers.push([bowler, economy]);
    
    }

    topBowlers.sort((a, b) => a[1] - b[1]);
    // for (let index of topBowlers.slice(0,10)) {
    //     items[index[0]] = index[1];
    // }
    topBowlers.forEach(element => {
        items[element[0]] = element[1]
    });

    return items;

}



module.exports = {
    numOfMatches,
    numOfWins,
    extraRunPerTeam,
    topTenEconomicalBowlers,
};
