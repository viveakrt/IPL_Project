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
            type: 'column'
        },
        title: {
            text: 'Matches Per Year'
        },
        subtitle: {
            text: 'Source: <a href="http://localhost:5002/api/extras>Data</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -90,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of matches'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Number of matches: <b>{point.y}</b>'
        },
        series: [{
            name: 'Matches',
            data: seriesData,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}', 
                y: 10, 
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}
