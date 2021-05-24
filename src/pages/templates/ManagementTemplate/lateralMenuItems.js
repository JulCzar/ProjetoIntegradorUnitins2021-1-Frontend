/**
 * @param {{
 * 	permissions: number[],
 * 	token: string | null
 * }} param1
 * @returns 
 */
export function getMenuItems({ permissions = [] } = {}) {
	/** @param {number} p */
	const hasPermission = p => permissions.includes(p)

	const allItems = [
		{label: 'Perfil', destination:'/perfil'},
		{label: 'Técnicos', destination:'/tecnicos', showIf: hasPermission(4)},
		{label: 'Cooperados', destination:'/cooperados', showIf: hasPermission(3) || hasPermission(2)},
		{label: 'Histórico', destination:'/historico', showIf: hasPermission(1)},
		{label: 'Relatórios', items: [
			{label: 'Técnico', destination:'/relatorio/tecnico', icon: 'fas fa-grip-lines'},
			{label: 'Cooperado', destination:'/relatorio/cooperado', icon: 'fas fa-grip-lines'},
			{label: 'Propriedade', destination:'/relatorio/propriedade', icon: 'fas fa-grip-lines'},
		], showIf: hasPermission(7)},
		{label: 'Grupos', destination:'/grupos', showIf: hasPermission(5)},
		{label: 'Motivos', destination: '/motivos', showIf: hasPermission(6)},
		{label: 'Administradores', destination:'/admins'},
	]

	return allItems
	.filter(i => {
		if (i.showIf === undefined) return true
		
		if (typeof i.showIf === 'function')
			return i.showIf()

		return i.showIf
	})
	.map(i => {
		const { showIf, ...rest } = i // eslint-disable-line

		return rest
	})
}

function MenuItem(label, destination) {
	this.label = label
	this.destination = destination
	this.value = this
}

/**
 * 
 * @param {*} param0 
 * @returns {MenuItem}
 */
const parseMenuItem = ({label, destination, ...rest}) => ({
	...(new MenuItem(label, destination)),
	...rest
})

const items = [
	{label: 'Perfil', destination:'/perfil'},
	{label: 'Técnicos', destination:'/tecnicos', showIf: () => {}},
	{label: 'Cooperados', destination:'/cooperados'},
	{label: 'Histórico', destination:'/historico'},
	{label: 'Relatórios', items: [
		{label: 'Técnico', destination:'/relatorio/tecnico', icon: 'fas fa-grip-lines'},
		{label: 'Cooperado', destination:'/relatorio/cooperado', icon: 'fas fa-grip-lines'},
		{label: 'Propriedade', destination:'/relatorio/propriedade', icon: 'fas fa-grip-lines'},
	]},
	{label: 'Grupos', destination:'/grupos'},
	{label: 'Motivos', destination: '/motivos'},
	{label: 'Administradores', destination:'/admins'},
]

export const lateralMenuItems = items.map(parseMenuItem)