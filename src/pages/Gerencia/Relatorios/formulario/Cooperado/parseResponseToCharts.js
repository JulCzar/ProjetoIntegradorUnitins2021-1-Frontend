
import Visita from '~/pages/Gerencia/Relatorios/model/Visita'
import { formatDate, getRandomColor } from '~/utils'
import { compareAsc } from 'date-fns'
import { Color } from '~/utils/getRandomColor' // eslint-disable-line

/** @param {{visitas: {diaVisita: string,motivos: string, propriedade: string,status: string, tecnico: string}[],cooperado: {associado_em: string, nome: string, sobrenome: string, email: string, phone: string},periodo: {inicio: string, fim: string},}} apiResponse @param {string} viewType */
function parseResponseToCharts(apiResponse, viewType) {
	/** @param {Visita[]} parsedVisitas @param {string[]} propriedades @param {Color[]} colors */
	function getLineChartData(parsedVisitas, propriedades, colors) {
		const labels = [...new Set(parsedVisitas.map(v => formatDate(v.diaVisita, viewType)))]
		const datasets = []

		for (const [i,p] of Object.entries(propriedades)) {
			const visitsOfP = parsedVisitas.filter(v => v.propriedade === p)
			/** @type {{[x:string]: number}} */
			const objectLabels = labels.reduce((acc, l) => ({...acc,[l]: 0}), {})

			visitsOfP.forEach(v => ++objectLabels[formatDate(v.diaVisita, viewType)])

			const dataOfP = {
				label: p,
				fill: false,
				borderColor: colors[+i].getHex(),
				data: Object.values(objectLabels)
			}

			datasets.push(dataOfP)
		}
	
		return {
			labels,
			datasets
		}
	}

	/** @param {Visita[]} parsedVisitas @param {string[]} labels @param {Color[]} colors */
	function getPizzaChartData(parsedVisitas, propriedades, colors) {
		const labels = propriedades
		/** @type {{[x:string]: number}} */
		const objectLabels = labels.reduce((acc, l) => ({...acc,[l]: 0}), {})

		parsedVisitas.forEach(v => ++objectLabels[v.propriedade])
		
		return {
			labels,
			datasets: [
				{
					data: Object.values(objectLabels),
					backgroundColor: colors.map(c => c.getHex()),
					hoverBackgroundColor: colors.map(c => c.getHigherBrightness(0.18).getHex())
				}
			]
		}
	}

	/** @param {Visita[]} parsedVisitas @param {string[]} propriedades */
	function getTecnicoTableData(parsedVisitas, propriedades) {
		/** @type {{[x:string]: { propriedade: string, tecnico: string, completed: number, canceled: number, total: number }}} */
		const propriedadesData = propriedades.reduce((acc, propriedade) => ({...acc,[propriedade]: {
			propriedade,
			tecnico: '',
			completed: 0,
			canceled: 0,
			total: 0
		}}), {})

		for (const visita of parsedVisitas) {
			const { tecnico, propriedade, status } = visita

			const data = propriedadesData[propriedade]

			if (status === 'cancelado') data.canceled++
			if (status === 'concluido') data.completed++

			data.total++
			data.tecnico = tecnico
		}

		return Object.values(propriedadesData)
	}

	/** @param {Visita[]} parsedVisitas @param {string[]} motivos */
	function getMotivoTableData(parsedVisitas, motivos) {
		const motivosData = motivos.reduce((acc, m) => ({...acc, [m]: {
			motivo: m,
			completed: 0,
			canceled: 0,
			total: 0,
		}}), {})


		for (const visita of parsedVisitas) {
			const { motivos, status } = visita

			for (const motivo of motivos) {
				const data = motivosData[motivo]

				if (status === 'cancelado') data.canceled++
				if (status === 'concluido') data.completed++

				data.total++
			}
		}

		return Object.values(motivosData)
	}

	const { visitas } = apiResponse
	
	const parsedVisitas = visitas.map(v => Visita.parseFromApi(v)).sort((v1, v2) => compareAsc(v1.diaVisita, v2.diaVisita))
	
	const propriedades = [...new Set(parsedVisitas.map(v => v.propriedade))]
	const motivos = [...new Set(parsedVisitas.map(v => v.motivos).flat(Infinity))]
	const colors = propriedades.map(() => getRandomColor())

	const lineChartData = getLineChartData(parsedVisitas, propriedades, colors)
	const pizzaChartData = getPizzaChartData(parsedVisitas, propriedades, colors)
	const tecnicoTableData = getTecnicoTableData(parsedVisitas, propriedades)
	const motivoTableData = getMotivoTableData(parsedVisitas, motivos)
	const details = {
		...apiResponse.cooperado,
		associado_em: formatDate(
			new Date(
				apiResponse
					.cooperado
					.associado_em
					.split(' ')
					.shift()
				),
				'dd/MM/yyyy'
			)
	}

	const { inicio, fim } = apiResponse.periodo
	const period = { start: inicio, end: fim }

	return {
		lineChartData,
		pizzaChartData,
		tecnicoTableData,
		motivoTableData,
		details,
		period
	}
}

export default parseResponseToCharts