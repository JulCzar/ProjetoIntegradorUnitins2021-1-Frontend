import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

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
	RelatorioLandingTecnico,
	ListarGrupos,
	VisitasMarcadas
} from '~/pages'

import Relatorio from '~/pages/Cooperado/Relatorio'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Genéricas */}
				<Route path='/' exact><Redirect to='/painel'/></Route>
				<Route path='/recuperar-senha' component={RecuperarSenha}/>
				<Route path='/alterar-senha' component={AlterarSenha}/>
				<Route path='/painel' component={PainelExibicao}/>
				<Route path='/login' component={Login}/>

				{/* Cadastros */}
				<Route path='/cadastrar/admin' component={CadastroAdmin}/>
				<Route path='/cadastrar/tecnico' component={CadastroTecn}/>
				<Route path='/cadastrar/cooperado' component={CadastroCooperado}/>

				{/* Administrador */}
				<Route path='/admin' component={PerfilAdmin} exact/>
				<Route path='/admin/grupos' component={ListarGrupos} exact/>
				<Route path='/admin/motivos' component={MotivoVisita}/>
				<Route path='/admin/historico' component={HistoricoVisitas} exact/>
				<Route path='/admin/grupos/criar' component={CriarGrupo}/>
				<Route path='/admin/grupos/editar' component={EditarGrupo}/>
				<Route path='/admin/historico/visita' component={DadosVisita}/>

				{/* Cooperado */}
				<Route path='/cooperado' component={BuscaCooperado} exact/>
				<Route path='/cooperado/perfil' component={PerfilCooperado}/>
				<Route path='/cooperado/relatorio' component={RelatorioLanding}/>
				<Route path='/cooperado/relatorio/:id' component={Relatorio}/>

				{/* Técnico */}
				<Route path='/tecnico' component={BuscaTecnico} exact/>
				<Route path='/tecnico/relatorio' component={RelatorioLandingTecnico}/>
				<Route path='/tecnico/perfil' component={PerfilTecnico}/>
				<Route path='/tecnico/visitas' component={VisitasMarcadas} exact/>
				<Route path='/tecnico/visitas/agendar' component={AgendarVisita}/>
				<Route path='/tecnico/visitas/detalhes' component={DetalhesVisita}/>
    
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