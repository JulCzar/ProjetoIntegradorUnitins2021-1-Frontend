/**
 * @param {{
 * 	permissions: number[],
 * 	token: string | null
 * }} param1
 * @returns 
 */
export function getMenuItems({ permissions = [], token, user } = {}) {
	const allItems = [
		{label: 'Home', destination:'/'},
		{label: 'Visitas', destination: '/visitas', showIf: (token && user?.id !== 1)},
		{label: 'Gestão', destination:'/perfil', showIf() {
			if (!token) return false

			for (const n of [1,2,3,4,5,6,7])
				if (permissions.includes(n)) 
					return true

			return false
		}},
		{label: 'login', destination:'/login', icon:'pi pi-fw pi-sign-in', showIf: !token},
		{label: 'Sair', destination: '/logout', icon: 'pi pi-fw pi-sign-out', showIf: token}
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