import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
	RelatorioLandingPropriedade,
	RelatorioLandingCooperado,
	RelatorioLandingTecnico,
	BuscaAdministrador,
	CadastroCooperado,
	HistoricoVisitas,
	PerfilCooperado,
	VisitasMarcadas,
	BuscaCooperado,
	DetalhesVisita,
	PainelExibicao,
	RecuperarSenha,
	AgendarVisita,
	PerfilTecnico,
	AlterarSenha,
	BuscaTecnico,
	CadastroTecn,
	ListarGrupos,
	MotivoVisita,
	PageNotFound,
	DadosVisita,
	PerfilAdmin,
	Login
} from '~/pages'

import Relatorio from '~/pages/Relatorio'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Genéricas */}
				<Route path='/' component={PainelExibicao} exact/>
				<Route path='/login' component={Login}/>

				{/* Senha */}
				<Route path='/senha/recuperar' component={RecuperarSenha}/>
				<Route path='/senha/alterar' component={AlterarSenha}/>

				{/* Cadastros */}
				<Route path='/cadastrar/tecnico' component={CadastroTecn}/>
				<Route path='/cadastrar/cooperado' component={CadastroCooperado}/>

				{/* Gerencia */}
				<Route path='/admins' component={BuscaAdministrador} exact/>
				<Route path='/perfil' component={PerfilAdmin} exact/>
				<Route path='/grupos' component={ListarGrupos} exact/>
				<Route path='/motivos' component={MotivoVisita}/>
				<Route path='/historico' component={HistoricoVisitas} exact/>
				<Route path='/historico/visita' component={DadosVisita}/>

				{/* Relatórios */}
				<Route path='/relatorio/tecnico' component={RelatorioLandingTecnico}/>
				<Route path='/relatorio/cooperado' component={RelatorioLandingCooperado}/>
				<Route path='/relatorio/propriedade' component={RelatorioLandingPropriedade}/>

				{/* Cooperado */}
				<Route path='/cooperados' component={BuscaCooperado} exact/>
				<Route path='/cooperados/perfil' component={PerfilCooperado}/>
				<Route path='/cooperados/relatorio/:data' component={Relatorio}/>

				{/* Técnico */}
				<Route path='/tecnicos' component={BuscaTecnico} exact/>
				<Route path='/tecnicos/:id' component={PerfilTecnico}/>

				{/* Visitas */}
				<Route path='/visitas' component={VisitasMarcadas} exact/>
				<Route path='/visitas/agendar' component={AgendarVisita}/>
				<Route path='/visitas/detalhe/:id' component={DetalhesVisita}/>

				{/* Grupo */}
				<Route path='/listar-grupos' component={ListarGrupos}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes