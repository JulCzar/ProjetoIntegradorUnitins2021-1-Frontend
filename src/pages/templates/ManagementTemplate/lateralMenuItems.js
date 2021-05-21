// import { store } from '~/store'

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
	{label: 'Técnicos', destination:'/tecnicos'},
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