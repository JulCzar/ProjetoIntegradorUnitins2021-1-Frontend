import React from 'react'
import { CardHeader } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Button, Column, DataTable } from '~/primereact'
import data from './data.json'

function MotivoVisita() {
	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Detalhes da Visita'/>
					<DataTable value={data}>
						<Column field="name" header="Name"/>
						<Column headerStyle={{textAlign: 'center'}} header="Ações" body={() => (
							<div className='p-d-flex p-jc-around'>
								<a>Editar</a>
								<a>Excluir</a>
							</div>
						)}/>
					</DataTable>
					<Button label='Criar Novo'/>
				</Card>
			</Content>
		</Container>
	)
}

export default MotivoVisita