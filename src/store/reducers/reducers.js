export const LOGIN_SUCCESS = (state, action) => {
	const { usuario, access_token: token, } = action.payload.data
	const { data: user, permissoes } = usuario
	
	const permissions = Object.values(permissoes)

	return {
		...state,
		user,
		token,
		permissions
	}
}

export const LOGIN_FAILURE = state => ({
	...state,
	user: {},
	token: null,
	permissions: []
})

export const LOGOUT = state => {
	console.log('logout realizado')
	return ({
		...state,
		user: {},
		token: null,
		permissions: []
	})
}