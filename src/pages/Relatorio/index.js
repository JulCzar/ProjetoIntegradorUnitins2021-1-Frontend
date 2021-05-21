import React from 'react'
import { Chart, Column, DataTable } from '~/primereact'
import { Block, Container, Content } from '~/common/styles'
import { lineOptions, lineData, pieData, pieOptions, tableData } from './data'
import { ReportTitle, TableTitle } from './styles'
import { format } from 'date-fns'
import { useHistory, useParams } from 'react-router'
import ptBr from 'date-fns/locale/pt-BR'

const DATE_PATTERN = 'dd \'de\' MMMM \'de\' yyyy'

const Relatorio = () => {
	const [start, setStart] = React.useState(null)
	const [end, setEnd] = React.useState(null)
	const history = useHistory()
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
				Relatório - {start?format(start, DATE_PATTERN, { locale: ptBr }):''} à {end?format(end, DATE_PATTERN, { locale: ptBr }):''}
			</ReportTitle>
			<Content className='p-grid p-d-flex p-jc-center p-p-3'>
				<Block className="p-grid p-col-12 p-mb-3 p-p-3">
					<Chart className='p-col-6 p-print-4' type='line' data={lineData} options={lineOptions} />
					<Chart className='p-col-6 p-print-4' type='pie' data={pieData} options={pieOptions} />
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