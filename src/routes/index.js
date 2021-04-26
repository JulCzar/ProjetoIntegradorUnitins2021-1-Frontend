import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
	AgendarVisita,
	AlterarSenha,
	CadastroAdmin,
	CadastroTecn,
	CriarGrupo,
	HelloWorld,
	Login,
	PageNotFound,
	RecuperarSenha
} from '~/pages'
import Relatorio from '~/pages/Cooperado/Relatorio'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Cooperado */}
				<Route path='/cooperado/login' component={Login}/>
				<Route path='/cooperado/relatorio' component={Relatorio}/>

				{/* Administrador */}
				<Route path='/admin/cadastrar' component={CadastroAdmin}/>
				{/* Técnico */}
				<Route path='/tecnico/cadastrar' component={CadastroTecn}/>
				<Route path='/tecnico/agendar-visita' component={AgendarVisita}/>

				{/* Genéricas */}
				<Route path='/' component={HelloWorld} exact/>
				<Route path='/recuperar-senha' component={RecuperarSenha}/>
				<Route path='/alterar-senha' component={AlterarSenha}/>

				{/* Grupo */}
				<Route path='/criar-grupo' component={CriarGrupo}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes