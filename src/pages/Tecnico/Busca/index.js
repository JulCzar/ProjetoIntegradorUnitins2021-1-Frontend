import React from 'react'

import { Button, Column, DataTable, InputText } from '~/primereact'

import { Link } from 'react-router-dom'
import { AdminTemplate, ContainerWithTemplate } from '~/template'
import { api } from '~/services'

function Busca() {
	const [tecnicos, setTecnicos] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		(async () => {
			setLoading(true)
			try {
				const { data } = await api.get('/tecnico/index')
				setTecnicos(data)
			} catch (err) {}
			finally {
				setLoading(false)
			}
		})()
	}, [])
	return (
		<AdminTemplate title='Buscar Técnico' loading={loading} contentClassName='p-fluid'>
			<InputText className='p-mb-3' name='.' placeholder='Pesquisar por nome ou cpf' />
			<DataTable emptyMessage='Nenhum item encontrado' value={tecnicos} className="p-datatable-striped">
				<Column field="nome_tecnico" header="Nome"/>
				<Column field="cpf_tecnico" header="CPF"/>
				<Column header='Ações'
					bodyClassName='p-d-flex p-jc-around'
					headerClassName='p-d-flex p-jc-center'
					body={() => (		
						<Link to='/tecnico/perfil'>Detalhes</Link>
					)}
				/>
			</DataTable>
			<Button onClick={() => history.push('/cadastrar/tecnico')} className='p-mt-3' label='Novo'/>
		</AdminTemplate>
	)
}

export default Busca