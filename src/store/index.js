import { routerMiddleware, connectRouter } from 'connected-react-router'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import history from '~/routes/history'

import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const dispatchActions = routerMiddleware(history)

const locationChangerAction = connectRouter(history)
const routerState = locationChangerAction(reducer)

// combina as pontes router e a saga em um composer
const composer = applyMiddleware(sagaMiddleware, dispatchActions)

// cria uma store conectada ao router
const store = createStore(routerState, composer)

// inicia a ponte Redux-Saga
sagaMiddleware.run(rootSaga)

export default store