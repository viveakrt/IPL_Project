fetch('./api/extras')
    .then(res => res.json())
    .then(extraRunsPerTeam);

fetch('./api/match')
    .then(res => res.json())
    .then(matchesPerYear);

fetch('./api/matchwon')
    .then(res => res.json())
    .then(matchesWonPerYear);


fetch('./api/topten')
    .then(res => res.json())
    .then(topTen);

function topTen(data) {
    let seriesData = [];
    for (let d in data) {
        seriesData.push([d, data[d]]);
    }

    Highcharts.chart('container4', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Top Ten Economical player',
            style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'black'
            }

        },
        subtitle: {
            text: 'Top Ten economical players in 2015'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',

                }
            },
            title: {
                text: 'Players',
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Runs',
                style: {
                    fontSize: '20px',
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Runs: <b>{point.y}</b>'
        },
        series: [{
            name: 'Matches',
            data: seriesData,
            color: '#59981A',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.3f}',
                x: -30,
                style: {
                    fontSize: '17px',
                }
            }
        }]
    });
}

function matchesWonPerYear(obj) {

    let data = Object.keys(obj);

    let years = data.map(element =>{
        //console.log(element);
        return element;
    });
    
    //console.log(years);
    let team = [];
    data.forEach(element => {
        data =(Object.keys(obj[element]));
        for(let i in data){
            if(team.indexOf(data[i]) >=0){
                
            }else{
                team.push(data[i]);
                //console.log("---");
            }
        
        }
    
    });
    team = team.filter(function (el) {
        return el != '';
    });
    
    //console.log(team);
    
    let teamData=[];
    years.forEach(element => {
        let arr = [];
        for(let i in team){  
            if(obj[element][team[i]] !== undefined){
                arr.push(obj[element][team[i]]);
                }
                else{
                    arr.push(0);
                }
        
        }
        teamData.push(arr);
    
    });
    //console.log(teamData);
    
    let serialData = [];
    for(let index in years){
        let object = {};
        object.name = 'Year'+years[index];
        object.data = teamData[index];
        serialData.push(object);
    }
    console.log(serialData);


    Highcharts.chart('container3', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Match Per Year'
        },

        xAxis: {
            categories: team,
            title: {
                text: 'Teams',
                
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Match',
                style: {
                    fontSize: '20px'
                }
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' Match'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: serialData
    });
}


function matchesPerYear(data) {
    let seriesData = [];
    for (let d in data) {
        seriesData.push([d, data[d]]);
    }

    Highcharts.chart('container2', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Matches Per Year',
            style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'black'
            }

        },
        subtitle: {
            text: 'Number of matches played per year'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',

                }
            },
            title: {
                text: 'Year',
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Match',
                style: {
                    fontSize: '20px',
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Matches Per Year: <b>{point.y}</b>'
        },
        series: [{
            name: 'Matches',
            data: seriesData,
            color: '#6F313C',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}',
                y: 30,
                style: {
                    fontSize: '17px',
                }
            }
        }]
    });

}

function extraRunsPerTeam(data) {
    let seriesData = [];
    for (let d in data) {
        seriesData.push([d, data[d]]);
    }

    Highcharts.chart('container', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Extra Runs Per Team',
            style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: 'black'
            }

        },
        subtitle: {
            text: 'Extra runs by every team in 2016'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',

                }
            },
            title: {
                text: 'Teams',
                style: {
                    fontSize: '20px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Extra Runs',
                style: {
                    fontSize: '20px',
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Matches Per Year: <b>{point.y}</b>'
        },
        series: [{
            name: 'Matches',
            data: seriesData,
            color: '#FFAEBC',
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}',
                x: -10,
                style: {
                    fontSize: '13px',
                }
            }
        }]
    });
}