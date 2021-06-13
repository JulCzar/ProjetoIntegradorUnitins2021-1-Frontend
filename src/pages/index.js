// Gerencias
export { default as HistoricoVisitas } from './Gerencia/Historico/Visitas'
export { default as DadosVisita } from './Gerencia/Historico/DadosVisita'
export { default as MotivoVisita } from './Gerencia/Motivos'
export { default as ListarGrupos } from './Gerencia/Grupos'
export { default as PerfilAdmin } from './Gerencia/Perfil'

// Relatórios
export { default as RelatorioLandingPropriedade } from './Gerencia/Relatorios/formulario/Propriedade'
export { default as RelatorioLandingCooperado} from './Gerencia/Relatorios/formulario/Cooperado'
export { default as RelatorioLandingTecnico } from './Gerencia/Relatorios/formulario/Tecnico'
export { default as RelatorioPropriedade } from './Gerencia/Relatorios/view/Propriedade'
export { default as RelatorioCooperado } from './Gerencia/Relatorios/view/Cooperado'
export { default as RelatorioTecnico } from './Gerencia/Relatorios/view/Tecnico'

// Cooperado
export { default as CadastroCooperado} from './Cooperado/Cadastro'
export { default as PerfilCooperado } from './Cooperado/Perfil'
export { default as BuscaCooperado } from './Cooperado/Lista'

// Visitas
export { default as VisitasMarcadas } from './Visitas/Marcadas'
export { default as DetalhesVisita } from './Visitas/Detalhes'
export { default as AgendarVisita } from './Visitas/Agendar'

// Tecnico
export { default as CadastroTecn } from './Tecnico/Cadastro'
export { default as PerfilTecnico } from './Tecnico/Perfil'
export { default as BuscaTecnico } from './Tecnico/Lista'

// Exports Gerais
export { default as RecuperarSenha } from './Geral/RecuperarSenha'
export { default as AlterarSenha } from './Geral/AlterarSenha'
export { default as PageNotFound } from './Geral/PageNotFound'
export { default as PainelExibicao } from './Geral/Painel'
export { default as Logout } from './Geral/Logout'
export { default as About } from './Geral/About'
export { default as Login } from './Geral/Login'
export { default as Gestao } from './Gerencia'