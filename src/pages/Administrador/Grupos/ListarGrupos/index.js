import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CardHeader } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Button, Column, DataTable } from '~/primereact'
import data from './data.json'

function ListarGrupos() {
	const history = useHistory()
	return (
		<Container>
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Grupos'/>
					<DataTable value={data}>
						<Column field="name" header="Nome"/>
						<Column headerStyle={{textAlign: 'center'}} header="Ações" body={teste => (
							<div className='p-d-flex p-jc-around'>
								<Link to='/admin/grupos/editar'>Editar</Link>
								<a>Excluir</a>
							</div>
						)}/>
					</DataTable>
					<Button onClick={() => history.push('/admin/grupos/criar')} label='Criar Novo'/>
				</Card>
			</Content>
		</Container>
	)
}

export default ListarGrupos