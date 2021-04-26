import { ConnectedRouter } from 'connected-react-router'
import PrimeReact from 'primereact/api'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Routes from '~/routes'
import React from 'react'

import history from './routes/history'

import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '~/index.css'
import store from './store'

PrimeReact.ripple = true

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Routes/>
		</ConnectedRouter>
	</Provider>
)

const ROOT = document.getElementById('root')

ReactDOM.render(<App/>, ROOT)