import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, UnForm } from '~/common/styles'
import { Button, Column, DataTable } from '~/primereact'
import data from './data.json'

function ListarGrupos() {
	const history= useHistory()
	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Listar Grupos'/>
					<UnForm>
                        	<UnInput name='.' placeholder='Pesquisar' />
                    	</UnForm>
					<DataTable value={data}>
						<Column field="nome" header="Nome"/>
						<Column headerStyle={{textAlign: 'center'}} header="Ações" body={() => (
							<div className='p-d-flex p-jc-around'>
								<Link to='/editar-grupo'>Detalhes</Link>
							</div>
						)}/>
					</DataTable>
					<Button onClick={() => {history.push('/criar-grupo')}} label='Criar'/>
				</Card>
			</Content>
		</Container>
	)
}

export default ListarGrupos
