import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
	AgendarVisita,
	AlterarSenha,
	BuscaCooperado,
	BuscaTecnico,
	CadastroAdmin,
	CadastroTecn,
	DadosVisita,
	DetalhesVisita,
	HelloWorld,
	Login,
	MotivoVisita,
	PageNotFound,
	PerfilAdmin,
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
				<Route path='/cooperado' component={BuscaCooperado} exact/>

				{/* Administrador */}
				<Route path='/admin/cadastrar' component={CadastroAdmin}/>
<<<<<<< HEAD

=======
				<Route path='/admin/perfil' component={PerfilAdmin}/>
				
>>>>>>> 2da1f418946be4daadeb7a8c4869a3299c1e893d
				{/* Técnico */}
				<Route path='/tecnico/cadastrar' component={CadastroTecn}/>
				<Route path='/tecnico/agendar-visita' component={AgendarVisita}/>
				<Route path='/tecnico/detalhes-visita' component={DetalhesVisita}/>
<<<<<<< HEAD

				{/* Histórico */}
				<Route path='/historico/visita' component={DadosVisita}/>

=======
				<Route path='/tecnico' component={BuscaTecnico} exact/>
    
>>>>>>> 2da1f418946be4daadeb7a8c4869a3299c1e893d
				{/* Genéricas */}
				<Route path='/' component={HelloWorld} exact/>
				<Route path='/recuperar-senha' component={RecuperarSenha}/>
				<Route path='/alterar-senha' component={AlterarSenha}/>
				<Route path='/motivos' component={MotivoVisita}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes