import React from 'react'
import { Link } from 'react-router-dom'
import { CardHeader } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Column, DataTable } from '~/primereact'
import { AdminTemplate } from '~/template'
import data from './data.json'

function Visita() {
	return (
		<AdminTemplate title='Histórico de Visitas'>
			<DataTable emptyMessage='Nenhum item encontrado' value={data} className="p-datatable-striped" paginator rows={7}>
				<Column field="date" header="Data da Visita"></Column>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="cooperado" header="Cooperado"/>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="tecnico" header="Técnico"/>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="motivo" header="Motivo"/>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} header="Ações" body={() => (
					<div className='p-d-flex p-jc-around'>
						<Link to='/admin/historico/visita'>detalhes</Link>
						<i className='fas fa-print'/>
					</div>
				)}/>
			</DataTable>
		</AdminTemplate>
	)
}

export default Visita