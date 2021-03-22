import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import HelloWorld from '~/pages/HelloWorld'

const Routes = function _Routes() {
	return (
		<BrowserRouter >
			<Switch>
				<Route path='/' component={HelloWorld} exact/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes