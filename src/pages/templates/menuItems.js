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

/**
 * @returns {{label: string, destination: string, icon?: string}[]}
 */
function getMenuItems() {
	const { auth } = store.getState()
	
	const allItems = [
		{label: 'Home', destination:'/'},
		{label: 'Visitas', destination: '/visitas'},
		{label: 'Gestão', destination:'/perfil'},
		{label: 'login', destination:'/login', icon:'pi pi-fw pi-sign-in'},
		{label: auth.user.name, destination: '/perfil'}
	]

	// const checkPermissions = () => {}
	
	return allItems.filter(i => i.label)
}

const items = getMenuItems()

export const menuItems = items.map(parseMenuItem)