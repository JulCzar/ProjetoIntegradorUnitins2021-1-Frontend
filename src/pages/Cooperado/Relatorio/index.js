import React from 'react'
import { Chart, Column, DataTable } from '~/primereact'
import { Card, Container, Content } from '~/common/styles'
import { lineOptions, lineData, pieData, pieOptions, tableData } from './data'
import { ReportTitle, TableTitle } from './styles'
import { format } from 'date-fns'

const DATE_PATTERN = 'dd/MMMM/yyyy'

const Relatorio = () => {
	const [start] = React.useState(new Date('2021-01-01'))
	const [end] = React.useState(new Date('2021-07-01'))

	return (
		<Container className='p-flex-column'>
			<ReportTitle className='p-col-12'>Relatório - {format(start, DATE_PATTERN)} à {format(end, DATE_PATTERN)}</ReportTitle>
			<Content className='p-grid'>
				<div className='p-grid p-d-flex p-jc-center'>
					<Chart className='p-col-6 p-print-4' type='line' data={lineData} options={lineOptions} />
					<Chart className='p-col-6 p-print-4' type='pie' data={pieData} options={pieOptions} />
					<Card>
						<TableTitle className='p-col-12'>Estatísticas dos Técnicos</TableTitle>
						<DataTable emptyMessage='Nenhum item encontrado' value={tableData} className='p-rol-12' rows={5}>
							<Column field='name' header='Name'></Column>
							<Column field='country.name' header='Country'></Column>
							<Column field='company' header='Company'></Column>
							<Column field='representative.name' header='Representative'></Column>
						</DataTable>
					</Card>
					<Card>
						<TableTitle className='p-col-12'>Visitas por Tipo</TableTitle>
						<DataTable emptyMessage='Nenhum item encontrado' value={tableData} className='p-rol-12' rows={5}>
							<Column field='name' header='Name'></Column>
							<Column field='country.name' header='Country'></Column>
							<Column field='company' header='Company'></Column>
							<Column field='representative.name' header='Representative'></Column>
						</DataTable>
					</Card>
				</div>
			</Content>
		</Container>
	)
}

export default Relatorio