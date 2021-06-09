
import { formatDate, getRandomColor } from '~/utils'

class Visita {
	/** @param {Date} diaVisita @param {string[]} motivos @param {string} propriedade @param {string} status @param {string} tecnico */
	constructor(diaVisita, motivos, propriedade, status, tecnico) {
		this.propriedade = propriedade
		this.diaVisita = diaVisita
		this.motivos = motivos
		this.tecnico = tecnico
		this.status = status
	}

	/** @param {{diaVisita: string,motivos: string, propriedade: string,status: string, tecnico: string}} visitaApi */
	static parseFromApi(visitaApi) {
		const { diaVisita, motivos, propriedade, status, tecnico } = visitaApi
		return new Visita(
			new Date(diaVisita),
			motivos.split(',').map(i => i.trim()),
			propriedade, status, tecnico
		)
	}
}

/**
 * 
 * @param {{
 * 	visitas: {diaVisita: string,motivos: string, propriedade: string,status: string, tecnico: string}[],
 *  cooperado: {associado_em: string, nome: string, sobrenome: string, email: string, phone: string},
 *  periodo: {inicio: string, fim: string},
 * }} apiResponse 
 * @param {string} viewType 
 * @returns 
 */
function parseResponseToCharts(apiResponse, viewType) {
	/** @param {Visita[]} parsedVisitas @param {string[]} propriedades @param {string[]} colors */
	function getLineChartData(parsedVisitas, propriedades, colors) {
		const labels = [...new Set(parsedVisitas.map(v => formatDate(v.diaVisita, viewType)))]
		const datasets = []

		for (const [i,p] of Object.entries(propriedades)) {
			const visitsOfP = parsedVisitas.filter(v => v.propriedade === p)
			/** @type {{[x:string]: number}} */
			const objectLabels = labels.reduce((acc, l) => ({...acc,[l]: 0}), {})

			visitsOfP.forEach(v => {
				++objectLabels[formatDate(v.diaVisita, viewType)]
			})

			const dataOfP = {
				label: p,
				fill: false,
				borderColor: colors[+i],
				data: Object.values(objectLabels)
			}

			datasets.push(dataOfP)
		}
	
		return {
			labels,
			datasets
		}
	}

	const { visitas } = apiResponse
	
	const parsedVisitas = visitas.map(v => Visita.parseFromApi(v))
	
	const propriedades = [...new Set(parsedVisitas.map(v => v.propriedade))]
	const colors = propriedades.map(() => getRandomColor().getHex())

	const lineChartData = getLineChartData(parsedVisitas, propriedades, colors)

	return {
		lineChartData
	}
}

export default parseResponseToCharts