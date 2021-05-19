import React from 'react'

import { Button, Column, DataTable, InputText } from '~/primereact'

import { Link, useHistory } from 'react-router-dom'
import { ManagementTemplate } from '~/template'
import { api } from '~/services'
import { getStringNormalized } from '~/utils'

function Busca() {
	const [filteredTecnicos, setFilteredTecnicos] = React.useState([])
	const [tecnicos, setTecnicos] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [query, setQuery] = React.useState('')
	const history = useHistory()

	React.useEffect(() => {
		(async () => {
			setLoading(true)
			try {
				const { data } = await api.get('/tecnico/index')
				setTecnicos(data)
				setFilteredTecnicos(data)
			} catch (err) {}
			finally {
				setLoading(false)
			}
		})()
	}, [])

	React.useEffect(() => {
		const queryNormalized = getStringNormalized(query).toLowerCase()
		const filteredTecnicos = tecnicos.filter(t => {
			const normalizedName = getStringNormalized(t.nome_tecnico).toLowerCase()
			const normalizedCPF = getStringNormalized(t.cpf_tecnico)

			if (normalizedName.includes(queryNormalized))
				return true
			else if (normalizedCPF.startsWith(queryNormalized))
				return true

			return false
		})

		setFilteredTecnicos(filteredTecnicos)
	}, [query])

	const StatusBody = data => (
		!data.status
			?<span className='p-d-flex p-jc-center'>Inativo</span>
			:<span className='p-d-flex p-jc-center'>Ativo</span>
	)

	return (
		<ManagementTemplate title='Buscar Técnico' loading={loading} contentClassName='p-fluid'>
			<InputText
				value={query}
				className='p-mb-3'
				placeholder='Pesquisar por nome ou cpf'
				onChange={e => setQuery(e.target.value)}
			/>
			<DataTable
				rows={7}
				paginator={filteredTecnicos.length > 7}
				value={filteredTecnicos}
				className="p-datatable-striped"
				emptyMessage='Nenhum item encontrado'
			>
				<Column field="nome_tecnico" header="Nome"/>
				<Column field="cpf_tecnico" header="CPF"/>
				<Column header={(
					<span className='p-d-flex p-jc-center'>Status</span>
				)} body={StatusBody}/>
				<Column header='Ações'
					bodyClassName='p-d-flex p-jc-around'
					headerClassName='p-d-flex p-jc-center'
					body={({ id }) => (		
						<Link to={`/tecnico/perfil/${id}`}>Detalhes</Link>
					)}
				/>
			</DataTable>
			<Button onClick={() => history.push('/cadastrar/tecnico')} className='p-mt-3' label='Novo'/>
		</ManagementTemplate>
	)
}

export default Busca