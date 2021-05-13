import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Column, DataTable, InputText } from '~/primereact'
import { api } from '~/services'
import { AdminTemplate} from '~/template'

function Busca() {
	const [cooperados, setCooperados] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		(async () => {
			setLoading(true)
			try {
				const { data } = await api.get('/cooperado/index')
				setCooperados(data)
			} catch (err) {}
			finally {
				setLoading(false)
			}
		})()
	}, [])
	return (
		<AdminTemplate title='Buscar Cooperado' loading={loading}>		
			<InputText className='p-mb-3' name='.' placeholder='Pesquisar por nome ou cpf' />
			<DataTable emptyMessage='Nenhum item encontrado' value={cooperados} className="p-datatable-striped">
				<Column field="nome_cooperado" header="Nome"/>
				<Column field="cpf_cooperado" header="CPF"/>
				<Column bodyClassName='p-d-flex p-jc-around' headerClassName='p-d-flex p-jc-center' header='Ações' body={() => (
				<Link to='/cooperado/perfil'>Detalhes</Link>
				)}/>
			</DataTable>
			<Button onClick={() => history.push('/cadastrar/cooperado')} className='p-mt-3' label='Novo'/>
		</AdminTemplate>
	)
}

export default Busca