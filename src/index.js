import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import PrimeReact from 'primereact/api'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import { locale, addLocale } from '~/primereact'
import { store, persistor } from '~/store'
import history from '~/routes/history'
import Routes from '~/routes'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '~/theme/style.css'

import ptBr from '~/assets/pt-br.json'

PrimeReact.ripple = true
addLocale('pt-br', ptBr)
locale('pt-br')

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ConnectedRouter history={history}>
				<Routes/>
			</ConnectedRouter>
		</PersistGate>
	</Provider>
)

const ROOT = document.getElementById('root')

ReactDOM.render(<App/>, ROOT)