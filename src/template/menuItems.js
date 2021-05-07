function MenuItem(label, destination) {
	this.label = label
	this.destination = destination
	this.value = this
}

const getMenuItem = ({label, destination, ...rest}) => ({
	...(new MenuItem(label, destination)),
	...rest
})

const items = [
	{label: 'Home', destination:'/'},
	{label: 'Cooperado', destination:'/cooperado'},
	{label: 'Tecnico', destination:'/tecnico'},
	{label: 'Gestão', destination:'/admin'},
	{label: 'login', destination:'/tecnico/login', icon: 'pi pi-fw pi-sign-in'}
]

export const menuItems = items.map(getMenuItem)