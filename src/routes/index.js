import { Switch, Route, BrowserRouter } from 'react-router-dom'
import * as ROUTES from '~/pages'
import React from 'react'

const Routes = function _Routes() {
	return (
		<BrowserRouter>
			<Switch>
				{/* Genéricas */}
				<Route path='/' component={ROUTES.PainelExibicao} exact/>
				<Route path='/logout' component={ROUTES.Logout}/>
				<Route path='/login' component={ROUTES.Login}/>

				{/* Senha */}
				<Route path='/senha/recuperar' component={ROUTES.RecuperarSenha}/>
				<Route path='/senha/alterar' component={ROUTES.AlterarSenha}/>

				{/* Cadastros */}
				<Route path='/cadastrar/tecnico' component={ROUTES.CadastroTecn}/>
				<Route path='/cadastrar/cooperado' component={ROUTES.CadastroCooperado}/>

				{/* Gerencia */}
				<Route path='/admins' component={ROUTES.BuscaAdministrador} exact/>
				<Route path='/perfil' component={ROUTES.PerfilAdmin} exact/>
				<Route path='/grupos' component={ROUTES.ListarGrupos} exact/>
				<Route path='/motivos' component={ROUTES.MotivoVisita}/>
				<Route path='/historico' component={ROUTES.HistoricoVisitas} exact/>
				<Route path='/historico/visita' component={ROUTES.DadosVisita}/>

				{/* Relatórios */}
				<Route path='/relatorio/tecnico' component={ROUTES.RelatorioLandingTecnico}/>
				<Route path='/relatorio/cooperado' component={ROUTES.RelatorioLandingCooperado}/>
				<Route path='/relatorio/propriedade' component={ROUTES.RelatorioLandingPropriedade}/>

				{/* Cooperado */}
				<Route path='/cooperados/relatorio/:data' component={ROUTES.RelatorioCooperado}/>
				<Route path='/cooperados' component={ROUTES.BuscaCooperado} exact/>
				<Route path='/cooperados/:id' component={ROUTES.PerfilCooperado}/>

				{/* Técnico */}
				<Route path='/tecnicos' component={ROUTES.BuscaTecnico} exact/>
				<Route path='/tecnicos/:id' component={ROUTES.PerfilTecnico}/>

				{/* Visitas */}
				<Route path='/visitas' component={ROUTES.VisitasMarcadas} exact/>
				<Route path='/visitas/agendar' component={ROUTES.AgendarVisita}/>
				<Route path='/visitas/detalhe/:id' component={ROUTES.DetalhesVisita}/>

				{/* Page Not Found, Precisa ser a ultima rota! */}
				<Route path='*' component={ROUTES.PageNotFound}/>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes