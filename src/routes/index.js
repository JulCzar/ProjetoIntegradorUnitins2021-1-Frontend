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
	DadosVisita,
	CriarGrupo,
	EditarGrupo,
	DetalhesVisita,
	HelloWorld,
	Login,
	MotivoVisita,
	PageNotFound,
	PainelExibicao,
	PerfilAdmin,
	RecuperarSenha,
	HistoricoVisitas,
	PerfilCooperado,
	PerfilTecnico,
	RelatorioLanding,
	RelatorioLandingTecnico
} from '~/pages'

import Relatorio from '~/pages/Cooperado/Relatorio'
import ListarGrupos from '~/pages/ListarGrupos'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Cooperado */}
				<Route path='/cooperado/relatorio/:id' component={Relatorio}/>
				<Route path='/cooperado' component={BuscaCooperado} exact/>
				<Route path='/cooperado/perfil' component={PerfilCooperado}/>
				<Route path='/cooperado/relatorio' component={RelatorioLanding}/>
				<Route path='/cooperado/cadastrar' component={CadastroCooperado}/>

				{/* Administrador */}
				<Route path='/admin/cadastrar' component={CadastroAdmin}/>
				<Route path='/admin/perfil' component={PerfilAdmin}/>

				{/* Técnico */}
				<Route path='/tecnico/login' component={Login}/>
				<Route path='/tecnico/cadastrar' component={CadastroTecn}/>
				<Route path='/tecnico/agendar-visita' component={AgendarVisita}/>
				<Route path='/tecnico/perfil' component={PerfilTecnico}/>
				<Route path='/tecnico/detalhes-visita' component={DetalhesVisita}/>
				<Route path='/tecnico/relatorio' component={RelatorioLandingTecnico}/>
				<Route path='/tecnico' component={BuscaTecnico} exact/>

				{/* Histórico */}
				<Route path='/historico/visita' component={DadosVisita}/>
				<Route path='/historico' component={HistoricoVisitas} exact/>

				{/* Genéricas */}
				<Route path='/' component={HelloWorld} exact/>
				<Route path='/recuperar-senha' component={RecuperarSenha}/>
				<Route path='/alterar-senha' component={AlterarSenha}/>
				<Route path='/painel-exibicao' component={PainelExibicao}/>
				<Route path='/motivos' component={MotivoVisita}/>
    
				{/* Grupo */}
				<Route path='/criar-grupo' component={CriarGrupo}/>
				<Route path='/editar-grupo' component={EditarGrupo}/>
				<Route path='/listar-grupos' component={ListarGrupos}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes