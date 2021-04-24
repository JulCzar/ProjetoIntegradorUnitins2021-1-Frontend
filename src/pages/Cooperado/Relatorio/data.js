const color = { fontColor: '#fff9'}
export {default as tableData} from './data.json'

export const lineData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Palmares',
			data: [65, 59, 80, 81, 56, 55, 40],
			fill: false,
			borderColor: '#42A5F5'
		},
		{
			label: 'Recanto',
			data: [28, 48, 40, 19, 86, 27, 90],
			fill: false,
			borderColor: '#FFA726'
		},
		{
			label: 'Alagado',
			data: [97, 12, 28, 29, 82, 44, 50],
			fill: false,
			borderColor: '#c364c3'
		}
	]
}
export const pieData = {
	labels: ['A', 'B', 'C'],
	datasets: [
		{
			data: [300, 50, 100],
			backgroundColor: [
				'#42A5F5',
				'#66BB6A',
				'#FFA726'
			],
			hoverBackgroundColor: [
				'#64B5F6',
				'#81C784',
				'#FFB74D'
			]
		}
	]
}

export const lineOptions = {
	legend: { labels: color },
	scales: {
		xAxes: [{ ticks: color }],
		yAxes: [{ ticks: color }]
	}
}

export const pieOptions = {
	legend: {
		labels: {
			fontColor: '#495057'
		}
	}
}