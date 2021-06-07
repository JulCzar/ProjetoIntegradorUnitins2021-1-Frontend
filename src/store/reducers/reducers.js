import { getRandomColor } from '~/utils'

export const LOGIN_SUCCESS = (state, action) => {
	const { usuario, access_token: token, } = action.payload.data
	const { data, permissoes } = usuario
	
	const user = {
		...data,
		color: getRandomColor().getHex().replace('#', '')
	}
	console.log(user)

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

export const LOGOUT = state => ({
	...state,
	user: {},
	token: null,
	permissions: []
})