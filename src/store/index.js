import { routerMiddleware, connectRouter } from 'connected-react-router'
import { persistReducer, persistStore } from 'redux-persist'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'

import history from '~/routes/history'
import reducer from './reducers'
import rootSaga from './sagas'

const key = 'store_root'

const persistedReducer = persistReducer({ key, storage }, reducer)

const sagaMiddleware = createSagaMiddleware()

// combina as pontes router e a saga em um composer
const composer = applyMiddleware(sagaMiddleware, routerMiddleware(history))

const routerState = connectRouter(history)(persistedReducer)

// cria uma store conectada ao router
const store = createStore(routerState, composer)

const persistor = persistStore(store)

// inicia a ponte Redux-Saga
sagaMiddleware.run(rootSaga)

export { store, persistor }