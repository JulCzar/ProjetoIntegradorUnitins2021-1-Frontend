import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import * as actions from '~/store/actions/auth'
import * as ROUTES from '~/pages'
import { api } from '~/services'
import { store } from '~/store'

const Routes = function ({ logout }) {
	const { auth } = store.getState()

	React.useEffect(() => {
		validateToken()
	},[])

	async function validateToken() {
		const { token } = auth
		if (!token) return

		try {
			const { data } = await api.post('/auth/validate')
			
			if (data.isValid) return
			
			logout()
		} catch ({ res }) { 
			logout()
		}
	}
	return (
		<BrowserRouter>
			<Switch>
				{/* Genéricas */}
				<Route path='/' component={ROUTES.PainelExibicao} exact/>
				<Route path='/logout' component={ROUTES.Logout}/>
				<Route path='/login' component={ROUTES.Login}/>

				{/* Senha */}
				<Route path='/senha/recuperar' component={ROUTES.RecuperarSenha}/>
				<Route path='/senha/alterar/:token' component={ROUTES.AlterarSenha}/>

				{/* Cadastros */}
				<Route path='/cadastrar/tecnico' component={ROUTES.CadastroTecn}/>
				<Route path='/cadastrar/cooperado' component={ROUTES.CadastroCooperado}/>

				{/* Gerencia */}
				<Route path='/gerir' component={ROUTES.Gestao} exact/>
				<Route path='/perfil' component={ROUTES.PerfilAdmin} exact/>
				<Route path='/grupos' component={ROUTES.ListarGrupos} exact/>
				<Route path='/motivos' component={ROUTES.MotivoVisita}/>
				<Route path='/historico' component={ROUTES.HistoricoVisitas} exact/>
				<Route path='/historico/visita/:id' component={ROUTES.DadosVisita}/>

				{/* Relatórios */}
				<Route path='/relatorio/tecnico' component={ROUTES.RelatorioLandingTecnico}/>
				<Route path='/relatorio/cooperado' component={ROUTES.RelatorioLandingCooperado}/>
				<Route path='/relatorio/propriedade' component={ROUTES.RelatorioLandingPropriedade}/>
				<Route path='/tecnico/relatorio/:data' component={ROUTES.RelatorioTecnico}/>
				<Route path='/cooperados/relatorio/:data' component={ROUTES.RelatorioCooperado}/>
				<Route path='/propriedade/relatorio/:data' component={ROUTES.RelatorioPropriedade}/>

				{/* Cooperado */}
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

Routes.propTypes = {
	logout: PropTypes.func
}

export default connect(
	props => props.auth,
	dispatch => bindActionCreators(actions, dispatch)
)(Routes)