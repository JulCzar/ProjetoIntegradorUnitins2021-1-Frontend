import { all } from 'redux-saga/effects'

import authSaga from './auth'

const rootSaga = function* _rootSaga() {
	yield all([...authSaga])
}

export default rootSaga