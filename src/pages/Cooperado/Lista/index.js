import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button, Column, DataTable, InputText } from '~/primereact'
import { api } from '~/services'
import { ManagementTemplate} from '~/pages/templates'
import { getStringNormalized } from '~/utils'
import { paginatorTemplate } from '~/common/paginatorTemplate'
import { PageNotFound } from '~/pages'
import { store } from '~/store'
import DTResponsive from '~/common/components/DTResponsive'

function Busca() {
	const [filteredCooperados, setFilteredCooperados] = React.useState([])
	const [permissions, setPermissions] = React.useState([])
	const [cooperados, setCooperados] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [query, setQuery] = React.useState('')
	const history = useHistory()

	React.useEffect(() => {
		loadData()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	React.useEffect(() => {
		const queryNormalized = getStringNormalized(query.toLowerCase())
		const filteredCooperados = cooperados.filter(t => {
			const normalizedName = getStringNormalized(t.nome_cooperado.toLowerCase())
			const normalizedCPF = getStringNormalized(t.cpf_cooperado)

			if (normalizedName.includes(queryNormalized))
				return true
			else if (normalizedCPF.startsWith(queryNormalized))
				return true

			return false
		})

		setFilteredCooperados(filteredCooperados)
	}, [query])

	async function loadData() {
		setLoading(true)
		try {
			const { data } = await api.get('/cooperado/index')
			setCooperados(data)
			setFilteredCooperados(data)
		} finally {
			setLoading(false)
		}
	}

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}

	const getCenteredText = text => (
		<span className='p-d-flex p-jc-center'>{text}</span>
	)

	const StatusBody = data => getCenteredText(!data.status?'Inativo':'Ativo')

	if (!(permissions.includes(2) || permissions.includes(7))) return <PageNotFound/>

	return (
		<ManagementTemplate title='Buscar Cooperado' loading={loading}>		
			<InputText
				value={query}
				className='p-mb-3'
				placeholder='Pesquisar por nome ou cpf'
				onChange={e => setQuery(e.target.value)}
			/>
			<DTResponsive>
				<DataTable
					rows={7}
					paginator
					value={filteredCooperados}
					rowsPerPageOptions={[7,15,30]}
					className="p-datatable-striped"
					emptyMessage='Nenhum item encontrado'
					paginatorTemplate={paginatorTemplate}
				>
					<Column field="nome_cooperado" header="Nome"/>
					<Column field="cpf_cooperado" header="CPF"/>
					<Column header={getCenteredText('Status')} body={StatusBody}/>
					<Column bodyClassName='p-d-flex p-jc-around' headerClassName='p-d-flex p-jc-center' header='Ações' body={rowData => (
						<Link to={`/cooperados/${rowData.id}`}>Detalhes</Link>
					)}/>
				</DataTable>
			</DTResponsive>
			{permissions.includes(2) && <Button onClick={() => history.push('/cadastrar/cooperado')} className='p-mt-3' label='Novo'/>}
		</ManagementTemplate>
	)
}

export default Busca