import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { CadastroAdmin, HelloWorld, Login, PageNotFound } from '~/pages'
import Cadastro from '~/pages/Cooperado/Cadastro'
import Relatorio from '~/pages/Cooperado/Relatorio'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' component={HelloWorld} exact/>
				{/* Cooperado */}
				<Route path='/cooperado/login' component={Login}/>
				<Route path='/cooperado/cadastrar' component={Cadastro}/>
				<Route path='/cooperado/relatorio' component={Relatorio}/>

				{/* Administrador */}
				<Route path='/admin/cadastro' component={CadastroAdmin}/>
				{/* Técnico */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes