import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
	AgendarVisita,
	AlterarSenha,
	BuscaCooperado,
	BuscaTecnico,
	CadastroAdmin,
	CadastroCooperado,
	CadastroTecn,
	DetalhesVisita,
	HelloWorld,
	Login,
	PageNotFound,
	PainelExibicao,
	PerfilAdmin,
	PerfilCooperado,
	PerfilTecnico,
	RecuperarSenha,
	RelatorioLanding,
	RelatorioLandingTecnico,
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
				<Route path='/cooperado/cadastro' component={CadastroCooperado}/>

				{/* Administrador */}
				<Route path='/admin/cadastrar' component={CadastroAdmin}/>
				<Route path='/admin/perfil' component={PerfilAdmin}/>
				
				{/* Técnico */}
				<Route path='/tecnico/cadastrar' component={CadastroTecn}/>
				<Route path='/tecnico/agendar-visita' component={AgendarVisita}/>
				<Route path='/tecnico/perfil' component={PerfilTecnico}/>
				<Route path='/tecnico/detalhes-visita' component={DetalhesVisita}/>
				<Route path='/tecnico/relatorio' component={RelatorioLandingTecnico}/>
				<Route path='/tecnico' component={BuscaTecnico} exact/>
    
				{/* Genéricas */}
				<Route path='/' component={HelloWorld} exact/>
				<Route path='/recuperar-senha' component={RecuperarSenha}/>
				<Route path='/alterar-senha' component={AlterarSenha}/>
				<Route path='/painel-exibicao' component={PainelExibicao}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes