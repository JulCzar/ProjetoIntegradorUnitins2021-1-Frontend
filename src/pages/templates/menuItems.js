/**
 * @returns {{label: string, destination: string, icon?: string}[]}
 */
	export function getMenuItems({ permissions = [], token } = {}) {
	const allItems = [
		{label: 'Home', destination:'/'},
		{label: 'Visitas', destination: '/visitas'},
		{label: 'Gestão', destination:'/perfil', access_level: [1,2,3,4,5,6,7]},
		{label: 'login', destination:'/login', icon:'pi pi-fw pi-sign-in', showIf: !token},
		{label: 'Sair', destination: '/logout', icon: 'pi pi-fw pi-sign-out', showIf: token}
	]

	// const checkPermissions = () => {}
	const showItem = i => {
		if (i.showIf !== undefined) {
			return (typeof i.showIf === 'function')?i.showIf():i.showIf
		}
		if (!i.access_level) return true

		if (Array.isArray(i.access_level)) {
			for (const al of i.access_level) 
				if (permissions.includes(al)) return true
			
			return false
		}

		return permissions.includes(i.access_level)
	}
	return allItems.filter(showItem)
}