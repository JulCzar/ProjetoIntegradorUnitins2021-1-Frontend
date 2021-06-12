import { useHistory, useLocation, useParams } from 'react-router'
import React from 'react'

import { ChartContainer, DetailsContainer, DetailsTitle, DetailsWrapper, ReportTitle, TableTitle } from './styles'
import { Block, Container, Content } from '~/common/styles'
import { Chart, Column, DataTable } from '~/primereact'
import { lineOptions, pieOptions } from '../data'
import { formatDate } from '~/utils'

const DATE_PATTERN = 'dd/MMM/yyyy'

const details = [
	{ key:53454615, label: 'Propriedade', value: 'nome' },
	{ key:12341234, label: 'Adicionada em', value: 'associado_em' },
	{ key:12364540, label: 'Telefone', value: 'phone' }
]

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
			<Content className='p-grid p-d-flex p-jc-center'>
				<Block className="p-grid p-col-12 p-mb-3">
					<ChartContainer className='p-grid p-col-6 p-p-3'>
						<TableTitle className='p-col-12'>Visitas por período</TableTitle>
						<Chart className='p-col-12' type='line' data={state.lineChartData} options={lineOptions} />
					</ChartContainer>
					<ChartContainer className='p-grid p-col-6 p-p-3'>
						<TableTitle className='p-col-12'>Visitas por propriedade</TableTitle>
						<Chart className='p-col-12' type='pie' data={state.pizzaChartData} options={pieOptions} />
					</ChartContainer>
				</Block>
				<Block className='p-mb-3 p-p-3'>
					<TableTitle className='p-col-12'>Estatísticas das Propriedades</TableTitle>
					<DataTable emptyMessage='Nenhum item encontrado' value={state.tecnicoTableData} className='p-rol-12' rows={5}>
						<Column field='propriedade' header='Propriedade'/>
						<Column field='tecnico' header='Técnico'/>
						<Column field='completed' header='Concluídas'/>
						<Column field='canceled' header='Canceladas'/>
						<Column field='total' header='Total'/>
					</DataTable>
				</Block>
				<Block className='p-mb-3 p-p-3'>
					<TableTitle className='p-col-12'>Visitas por Tipo</TableTitle>
					<DataTable emptyMessage='Nenhum item encontrado' value={state.motivoTableData} className='p-rol-12' rows={5}>
						<Column field='motivo' header='Motivo'/>
						<Column field='completed' header='Concluídas'/>
						<Column field='canceled' header='Canceladas'/>
						<Column field='total' header='Total'/>
					</DataTable>
				</Block>
				<Block className="p-grid p-col-12 p-p-3">
					<TableTitle className='p-col-12 p-grid'>Dados do Cooperado</TableTitle>
					<DetailsContainer className='p-col-12 p-grid'>
						{details.map(d => (
							<DetailsWrapper className='p-col-6' key={d.key}>
								<DetailsTitle>{d.label}</DetailsTitle>
								<div>{state.details[d.value]}</div>
							</DetailsWrapper>
						))}
					</DetailsContainer>
				</Block>
			</Content>
		</Container>
	)
}

export default Relatorio