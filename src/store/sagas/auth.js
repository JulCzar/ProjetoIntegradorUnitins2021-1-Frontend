import { put, takeLeading } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as actions from '~/store/actions/auth'
import api from '~/services/api'

const login = function* _login(action) {
	const { data } = action.payload
	
	yield put(actions.loginSuccess(data))

	yield put(push('/tecnico'))
}

const storeTecnico = function* () {
	const { data } = action.payload

	try {
		const { data: response } = yield put(api.post, '/tecnico/store', data)

		return response
	}
	catch (err) {
		console.warn(err) // eslint-disable-line
	}
}

const logout = function* _logout() {
	yield put(actions.logout())

	yield put(push('/logged_out'))
}

const AUTH_SAGA = [
	takeLeading('LOGIN', login),
	takeLeading('CADASTRAR_TECNICO', storeTecnico),
	takeLeading('LOGOUT', logout)
]

export default AUTH_SAGA