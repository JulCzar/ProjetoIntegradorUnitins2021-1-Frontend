export default class Visita {
	/** @param {Date} diaVisita @param {string[]} motivos @param {string} propriedade @param {string} status @param {string} tecnico @param {string} coopreado*/
	constructor({diaVisita, motivos, propriedade, status, tecnico, cooperado}) {
		this.propriedade = propriedade
		this.cooperado = cooperado??''
		this.diaVisita = diaVisita
		this.tecnico = tecnico??''
		this.motivos = motivos
		this.status = status
	}

	/** @param {{diaVisita: string,motivos: string, propriedade: string,status: string, tecnico: string}} visitaApi */
	static parseFromApi(visitaApi) {
		const { diaVisita, motivos: reasons, propriedade, status, tecnico, cooperado } = visitaApi

		const motivos = reasons.split(',').map(i => i.trim())
		return new Visita({
			diaVisita: new Date(diaVisita),
			propriedade,
			motivos,
			tecnico,
			status,
			cooperado
		})
	}	
}