import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { HelloWorld, Login, PageNotFound } from '~/pages'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' component={HelloWorld} exact/>
				<Route path='/login' component={Login}/>
				<Route path='/*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes