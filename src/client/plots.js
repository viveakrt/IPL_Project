fetch('./api/extras')
    .then(res => res.json())
    .then(matchesPerYear);

function matchesPerYear(data) {
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
