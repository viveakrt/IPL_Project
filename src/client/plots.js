fetch("./api/extras")
	.then((res) => res.json())
	.then(extraRunsPerTeam)
	.catch((err) => console.error(err));

fetch("./api/match")
	.then((res) => res.json())
	.then(matchesPerYear)
	.catch((err) => console.error(err));

fetch("./api/matchwon")
	.then((res) => res.json())
	.then(matchesWonPerYear);

fetch("./api/topten")
	.then((res) => res.json())
	.then(topTen);

function matchesWonPerYear(data) {
	const matches = {};
	data.forEach((element) => {
		if (element.season in matches) {
			matches[element.season][element.winner] = element.Winner;
		} else {
			matches[element.season] = {};
			matches[element.season][element.winner] = element.Winner;
		}
	});

	const season = Object.keys(matches);
	const match = Object.values(matches);

	const result = [];

	let count = 0;

	match.forEach((element) => {
		const teams = Object.keys(element);
		teams.forEach((team) => {
			if (team) {
				const findTeam = result.find((item) => item.name === team);
				if (findTeam) {
					findTeam.data[count] = element[team];
				} else {
					let obj = {};
					obj.name = team;
					obj.data = Array(season.length).fill("");
					obj.data[count] = element[team];
					result.push(obj);
				}
			}
		});
		count++;
	});

	Highcharts.chart("container3", {
		chart: {
			type: "bar",
		},
		title: {
			text: "Number of matches won per team per year in IPL",
		},
		subtitle: {
			text: "",
		},
		xAxis: {
			categories: season,
			title: {
				text: null,
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: "No. of Matches",
				align: "high",
			},
			labels: {
				overflow: "justify",
			},
		},
		tooltip: {
			valueSuffix: " won",
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
				},
			},
		},
		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "top",
			x: -40,
			y: 80,
			floating: true,
			borderWidth: 1,
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
			shadow: true,
		},
		credits: {
			enabled: false,
		},
		series: result,
	});
}

function topTen(data) {
	let seriesData = [];
	for (let index = 0; index < data.length; index++) {
		seriesData.push([data[index].bowler, data[index].economy]);
	}

	Highcharts.chart("container4", {
		chart: {
			type: "bar",
		},
		title: {
			text: "Top Ten Economical player",
			style: {
				fontSize: "22px",
				fontWeight: "bold",
				color: "black",
			},
		},
		subtitle: {
			text: "Top Ten economical players in 2015",
		},
		xAxis: {
			type: "category",
			labels: {
				rotation: 0,
				style: {
					fontSize: "13px",
				},
			},
			title: {
				text: "Players",
				style: {
					fontSize: "20px",
				},
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: "Runs",
				style: {
					fontSize: "20px",
				},
			},
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			pointFormat: "Runs: <b>{point.y}</b>",
		},
		series: [
			{
				name: "Matches",
				data: seriesData,
				color: "#59981A",
				dataLabels: {
					enabled: true,
					rotation: 0,
					color: "#FFFFFF",
					align: "right",
					format: "{point.y:.3f}",
					x: -30,
					style: {
						fontSize: "17px",
					},
				},
			},
		],
	});
}

function matchesPerYear(data) {
	let seriesData = [];
	for (let index = 0; index < data.length; index++) {
		seriesData.push([data[index].season, data[index].matches]);
	}
	Highcharts.chart("container2", {
		chart: {
			type: "column",
		},
		title: {
			text: "Matches Per Year",
			style: {
				fontSize: "22px",
				fontWeight: "bold",
				color: "black",
			},
		},
		subtitle: {
			text: "Number of matches played per year",
		},
		xAxis: {
			type: "category",
			labels: {
				rotation: 0,
				style: {
					fontSize: "13px",
				},
			},
			title: {
				text: "Year",
				style: {
					fontSize: "20px",
				},
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: "Number of Match",
				style: {
					fontSize: "20px",
				},
			},
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			pointFormat: "Matches Per Year: <b>{point.y}</b>",
		},
		series: [
			{
				name: "Matches",
				data: seriesData,
				color: "#6F313C",
				dataLabels: {
					enabled: true,
					rotation: 0,
					color: "#FFFFFF",
					align: "right",
					format: "{point.y}",
					y: 30,
					style: {
						fontSize: "17px",
					},
				},
			},
		],
	});
}

function extraRunsPerTeam(data) {
	let seriesData = [];
	for (let index = 0; index < data.length; index++) {
		seriesData.push([data[index].batting_team, data[index].extra]);
	}

	Highcharts.chart("container", {
		chart: {
			type: "bar",
		},
		title: {
			text: "Extra Runs Per Team",
			style: {
				fontSize: "22px",
				fontWeight: "bold",
				color: "black",
			},
		},
		subtitle: {
			text: "Extra runs by every team in 2016",
		},
		xAxis: {
			type: "category",
			labels: {
				rotation: 0,
				style: {
					fontSize: "13px",
				},
			},
			title: {
				text: "Teams",
				style: {
					fontSize: "20px",
				},
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: "Extra Runs",
				style: {
					fontSize: "20px",
				},
			},
		},
		legend: {
			enabled: false,
		},
		tooltip: {
			pointFormat: "Matches Per Year: <b>{point.y}</b>",
		},
		series: [
			{
				name: "Matches",
				data: seriesData,
				color: "#FFAEBC",
				dataLabels: {
					enabled: true,
					rotation: 0,
					color: "#FFFFFF",
					align: "right",
					format: "{point.y}",
					x: -10,
					style: {
						fontSize: "13px",
					},
				},
			},
		],
	});
}
