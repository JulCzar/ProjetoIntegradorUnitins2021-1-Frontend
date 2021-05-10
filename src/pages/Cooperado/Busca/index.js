import React from 'react'
import { Link } from 'react-router-dom'

import { CardHeader, UnInput } from '~/common/components'
import { Block, UnForm } from '~/common/styles'
import { Button, Column, DataTable } from '~/primereact'
import { api } from '~/services'
import { ContainerWithTemplate } from '~/template'

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
		<ContainerWithTemplate loading={loading} contentClassName='p-fluid p-mt-5'>	
			<Block className='p-p-3'>
				<CardHeader title='Buscar Cooperado'/>
				<UnForm>
					<UnInput name='.' placeholder='Pesquisar por nome ou cpf' />
				</UnForm>
				<DataTable value={cooperados} className="p-datatable-striped">
					<Column field="nome_cooperado" header="Nome"/>
					<Column field="cpf_cooperado" header="CPF"/>
					<Column bodyClassName='p-d-flex p-jc-around' headerClassName='p-d-flex p-jc-center' header='Ações' body={() => (
						<React.Fragment>
							<Link to='/cooperado/perfil'>Detalhes</Link>
							<a>Desativar</a>
						</React.Fragment>
					)}/>
				</DataTable>
				
				<Link to='/cadastrar/cooperado'>
					<Button className='p-mt-3' label='Novo'/>
				</Link>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Busca