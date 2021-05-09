import * as reducers from './reducers'

const INITIAL_STATE = {
	token: null,
	user: {}
}

export default function auth(state = INITIAL_STATE, actionRequested) {
	const { type } = actionRequested

	const reducer = reducers[type]

	if (!reducer) return state

	return reducer(state, actionRequested)
}