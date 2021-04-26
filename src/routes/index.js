import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
	AgendarVisita,
	AlterarSenha,
	BuscaCooperado,
	BuscaTecnico,
	CadastroAdmin,
	CadastroTecn,
	CriarGrupo,
	EditarGrupo,
	DetalhesVisita,
	HelloWorld,
	Login,
	PageNotFound,
	PerfilAdmin,
	PerfilCooperado,
	PerfilTecnico,
	RecuperarSenha,
	RelatorioLanding,
} from '~/pages'

import Relatorio from '~/pages/Cooperado/Relatorio'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Cooperado */}
				<Route path='/cooperado/login' component={Login}/>
				<Route path='/cooperado/relatorio/:id' component={Relatorio}/>
				<Route path='/cooperado' component={BuscaCooperado} exact/>
				<Route path='/cooperado/perfil' component={PerfilCooperado}/>
				<Route path='/cooperado/relatorio' component={RelatorioLanding}/>

				{/* Administrador */}
				<Route path='/admin/cadastrar' component={CadastroAdmin}/>
				<Route path='/admin/perfil' component={PerfilAdmin}/>
				
				{/* Técnico */}
				<Route path='/tecnico/cadastrar' component={CadastroTecn}/>
				<Route path='/tecnico/agendar-visita' component={AgendarVisita}/>
				<Route path='/tecnico/perfil' component={PerfilTecnico}/>
				<Route path='/tecnico/detalhes-visita' component={DetalhesVisita}/>
				<Route path='/tecnico' component={BuscaTecnico} exact/>
    
				{/* Genéricas */}
				<Route path='/' component={HelloWorld} exact/>
				<Route path='/recuperar-senha' component={RecuperarSenha}/>
				<Route path='/alterar-senha' component={AlterarSenha}/>

				{/* Grupo */}
				<Route path='/criar-grupo' component={CriarGrupo}/>
				<Route path='/editar-grupo' component={EditarGrupo}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes