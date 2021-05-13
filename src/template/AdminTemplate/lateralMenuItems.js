import { store } from '~/store'

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
	{label: 'Perfil', destination:'/admin/perfil'},
	{label: 'Técnicos', destination:'/tecnico'},
	{label: 'Cooperados', destination:'/cooperado'},
	{label: 'Histórico', destination:'/admin/historico'},
	{label: 'Relatórios', items: [
		{label: 'Técnico', destination:'/relatorio/tecnico', icon: 'fas fa-grip-lines'},
		{label: 'Cooperado', destination:'/relatorio/cooperado', icon: 'fas fa-grip-lines'},
		{label: 'Propriedade', destination:'/relatorio/propriedade', icon: 'fas fa-grip-lines'},
	]},
	{label: 'Grupos', destination:'/admin/grupos'},
	{label: 'Motivos', destination: '/admin/motivos'},
	{label: 'Administradores', destination:'/admin'},
]

export const lateralMenuItems = items.map(parseMenuItem)