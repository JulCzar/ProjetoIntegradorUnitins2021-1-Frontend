export const LOGIN_SUCCESS = (state, action) => {
	const { user: apiUser, access_token: token, } = action.payload.data
	const { usuario: user, permissoes } = apiUser
	
	const permissions = Object.values(permissoes)

	console.log(token, user, permissions)
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

export const LOGOUT = state => ({
	...state,
	user: {},
	token: null,
	permissions: []
})