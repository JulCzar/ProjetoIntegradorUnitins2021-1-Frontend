import { call, put, takeLeading } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as actions from '~/store/actions/auth'
import api from '~/services/api'

const login = function* _login(action) {
	const { data: form } = action.payload
	
	const { data } = yield call(api.post, '/auth/login', form)

	yield put(actions.loginSuccess(data))

	yield put(push('/tecnico'))
}

const logout = function* _logout() {
	yield put(actions.logout())

	yield put(push('/'))
}

const AUTH_SAGA = [
	takeLeading('LOGIN', login),
	takeLeading('LOGOUT', logout)
]

export default AUTH_SAGA