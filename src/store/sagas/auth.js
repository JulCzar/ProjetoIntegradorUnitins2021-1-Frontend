import { put, takeLeading } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as actions from '~/store/actions/auth'

const login = function* _login(action) {
	const { data } = action.payload
	
	yield put(actions.loginSuccess(data))

	yield put(push('/tecnico'))
}

const logout = function* _logout() {
	yield put(actions.logout())

	yield put(push('/logged_out'))
}

const AUTH_SAGA = [
	takeLeading('LOGIN', login),
	takeLeading('LOGOUT', logout)
]

export default AUTH_SAGA