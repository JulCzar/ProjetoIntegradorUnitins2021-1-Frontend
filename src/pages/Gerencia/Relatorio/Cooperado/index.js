import { useHistory, useLocation, useParams } from 'react-router'
import React from 'react'

import { ChartContainer, ReportTitle, TableTitle } from './styles'
import { lineOptions, pieOptions, tableData } from './data'
import { Block, Container, Content } from '~/common/styles'
import { Chart, Column, DataTable } from '~/primereact'
import { formatDate } from '~/utils'

const DATE_PATTERN = 'dd \'de\' MMMM \'de\' yyyy'

const Relatorio = () => {
	const [start, setStart] = React.useState(null)
	const [end, setEnd] = React.useState(null)
	const history = useHistory()
	const { state } = useLocation()
	const { data } = useParams()

	React.useEffect(() => {
		try {
			const parsedData = atob(data)

			const { start, end } = JSON.parse(parsedData)

			setStart(new Date(start))
			setEnd(new Date(end))
		} catch (error) {
			history.replace('/error')
		}
	}, [])

	return (
		<Container className='p-d-flex p-flex-column p-p-5'>
			<ReportTitle>
				Relatório - {start?formatDate(start, DATE_PATTERN):''} à {end?formatDate(end, DATE_PATTERN):''}
			</ReportTitle>
			<Content className='p-grid p-d-flex p-jc-center p-p-3'>
				<Block className="p-grid p-col-12 p-mb-3 p-p-3">
					<ChartContainer className='p-col-6 p-print-6'>
						<TableTitle>Visitas por período</TableTitle>
						<Chart type='line' data={state.lineChartData} options={lineOptions} />
					</ChartContainer>
					<ChartContainer className='p-col-6 p-print-6'>
						<TableTitle>Visitas por propriedade</TableTitle>
						<Chart type='pie' data={state.pizzaChartData} options={pieOptions} />
					</ChartContainer>
				</Block>
				<Block className='p-mb-3 p-p-3'>
					<TableTitle className='p-col-12'>Estatísticas dos Técnicos</TableTitle>
					<DataTable emptyMessage='Nenhum item encontrado' value={tableData} className='p-rol-12' rows={5}>
						<Column field='name' header='Name'/>
						<Column field='country.name' header='Country'/>
						<Column field='company' header='Company'/>
						<Column field='representative.name' header='Representative'/>
					</DataTable>
				</Block>
				<Block className="p-p-3">
					<TableTitle className='p-col-12'>Visitas por Tipo</TableTitle>
					<DataTable emptyMessage='Nenhum item encontrado' value={tableData} className='p-rol-12' rows={5}>
						<Column field='name' header='Name'/>
						<Column field='country.name' header='Country'/>
						<Column field='company' header='Company'/>
						<Column field='representative.name' header='Representative'/>
					</DataTable>
				</Block>
			</Content>
		</Container>
	)
}

export default Relatorio