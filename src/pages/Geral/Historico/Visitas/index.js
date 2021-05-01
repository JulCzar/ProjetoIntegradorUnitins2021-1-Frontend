import React from 'react'
import { CardHeader } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Column, DataTable } from '~/primereact'
import data from './data.json'

function Visita() {
	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='1000px'>
					<CardHeader title='Histórico de Visitas'/>
					<DataTable value={data} className="p-datatable-striped" paginator rows={7}>
						<Column field="date" header="Data da Visita"></Column>
						<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="cooperado" header="Cooperado"/>
						<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="tecnico" header="Técnico"/>
						<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="motivo" header="Motivo"/>
						<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} header="Ações" body={() => (
							<div className='p-d-flex p-jc-around'>
								<a>detalhes</a>
								<i className='fas fa-print'/>
							</div>
						)}/>
					</DataTable>
				</Card>
			</Content>
		</Container>
	)
}

export default Visita