// Administrador
export { default as CadastroAdmin } from './Administrador/Cadastro'
export { default as PerfilAdmin } from './Administrador/Perfil'
export { default as ListarGrupos } from './Administrador/Grupos/Listar'
export { default as CriarGrupo } from './Administrador/Grupos/CriarGrupo'
export { default as EditarGrupo } from './Administrador/Grupos/EditarGrupo'
export { default as DadosVisita } from './Administrador/Historico/DadosVisita'
export { default as MotivoVisita } from './Administrador/MotivoVisita'
export { default as HistoricoVisitas } from './Administrador/Historico/Visitas'

//Cooperado
export { default as Login } from './Geral/Login'
export { default as BuscaCooperado } from './Cooperado/Busca'
export { default as PerfilCooperado } from './Cooperado/Perfil'
export { default as RelatorioLanding} from './Cooperado/RelatorioLanding'
export { default as CadastroCooperado} from './Cooperado/Cadastro'

// Tecnico
export { default as CadastroTecn } from './Tecnico/Cadastro'
export { default as AgendarVisita } from './Tecnico/AgendarVisita'
export { default as DetalhesVisita } from './Tecnico/DetalhesVisita'
export { default as BuscaTecnico } from './Tecnico/Busca'
export { default as PerfilTecnico } from './Tecnico/Perfil'
export { default as RelatorioLandingTecnico } from './Tecnico/RelatorioLanding'
export { default as VisitasMarcadas } from './Tecnico/VisitasMarcadas'

// Exports Gerais
export { default as RecuperarSenha } from './Geral/RecuperarSenha'
export { default as AlterarSenha } from './Geral/AlterarSenha'
export { default as PageNotFound } from './Geral/PageNotFound'
export { default as PainelExibicao } from './Geral/PainelExibicao'