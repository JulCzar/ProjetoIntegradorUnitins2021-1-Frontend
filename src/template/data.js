const getMenuItem = ({label, destination, ...rest}) => ({label, destination, value: {destination}, ...rest})

const items = [
	{label: 'Home', destination:'/'},
	{label: 'Cooperado', destination:'/cooperado'},
	{label: 'Tecnico', destination:'/tecnico'},
	{label: 'Gestão', destination:'/admin/login'},
	{label: 'login', destination:'/tecnico/login', icon: 'pi pi-fw pi-sign-in'}
]

export const menuItems = items.map(getMenuItem)