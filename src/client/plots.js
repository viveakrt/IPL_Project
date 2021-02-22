fetch('./api/extras')
    .then(res => res.json())
    .then(extraRunsPerTeam);

fetch('./api/match')
    .then(res => res.json())
    .then(matchesPerYear);

fetch('./api/matchwon')
    .then(res => res.json())
    .then(matchesWonPerYear);

function matchesWonPerYear(data){
    
}


function matchesPerYear(data){
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
            style:{
                fontSize:'22px',
                fontWeight:'bold',
                color:'black'
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
                y : 30,
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
            style:{
                fontSize:'22px',
                fontWeight:'bold',
                color:'black'
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
