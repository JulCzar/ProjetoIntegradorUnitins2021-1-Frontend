/**
 * @param {{
 * 	permissions: number[],
 * 	token: string | null
 * }} param1
 * @returns 
 */
export function getMenuItems({ permissions = [], token } = {}) {
	const allItems = [
		{label: 'Home', destination:'/'},
		{label: 'Gestão', destination:'/gerir', showIf() {
			if (!token) return false

			for (const n of [1,2,3,4,5,6,7])
				if (permissions.includes(n)) 
					return true

			return false
		}},
		{label: 'login', destination:'/login', icon:'pi pi-fw pi-sign-in', showIf: !token}
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