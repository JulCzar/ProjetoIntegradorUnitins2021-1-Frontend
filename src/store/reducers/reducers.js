export const LOGIN_SUCCESS = (state, action) => {
	const { user, token } = action.payload.data

	return {
		...state,
		user,
		token
	}
}

export const LOGIN_FAILURE = (state, action) => ({
	...state,
	user: {},
	token: null
})

export const LOGOUT = (state, action) => ({
	...state,
	user: {},
	token: null
})