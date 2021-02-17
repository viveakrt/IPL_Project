function numOfMatches(matches){

    if (typeof matches !== 'object' || matches.length === 0){
        return {};
    }
    else{
        let yearCount = {};

        for (let index=0; index < matches.length; index++) {
            let years=matches[index].season;
            if(years in yearCount){
                yearCount[years]++;
            }
            else{
                yearCount[years] = 1;
            }
        }
        return yearCount;
    }
}

module.exports = {
    numOfMatches
}