import { useHistory, useLocation } from 'react-router'
import React from 'react'

import { Break, ChartContainer, DetailsContainer, DetailsTitle, DetailsWrapper, FABIcon, ReportTitle, TableTitle } from '../styles'
import { Block, ChartWrapper, Container, Content } from '~/common/styles'
import { Chart, Column, DataTable } from '~/primereact'
import PageNotFound from '~/pages/Geral/PageNotFound'
import { lineOptions, pieOptions } from '../data'
import { formatDate } from '~/utils'
import { store } from '~/store'

const DATE_PATTERN = 'dd/MMM/yyyy'

const details = [
	{ key:4528345798, label: 'Tecnico', value: 'nome' },
	{ key:4162544156, label: 'Associado desde', value: 'associado_em' },
	{ key:4315423487, label: 'Total de visitas no período', value: 'total' }
]

const Relatorio = () => {
	const [start, setStart] = React.useState(null)
	const [end, setEnd] = React.useState(null)
	const { state } = useLocation()
	const [permissions, setPermissions] = React.useState([])
	const [logged, setLogged] = React.useState(false)
	const history = useHistory()

	React.useEffect(() => {
		loadRelatorio()
		updateLogged()
		updatePermissions()
		store.subscribe(() => {
			updateLogged()
			updatePermissions()
		})
	}, [])

	function loadRelatorio() {
		try {
			const { start, end } = state.period

			setStart(new Date(start))
			setEnd(new Date(end))
		} catch (error) {
			history.replace('/error')
		}
	}

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth
		
		setPermissions(permissions ?? [])
	}

	function updateLogged() {
		const { auth } = store.getState()
		const { token, user } = auth
		
		setLogged(token && user)
	}

	if (!logged) return <PageNotFound/>
	if (!permissions.includes(6)) return <PageNotFound/>

	return (
		<Container className='p-d-flex p-flex-column p-p-5'>
			<FABIcon className='fas fa-print' onClick={print}/>
			<ReportTitle>
				Relatório - {start?formatDate(start, DATE_PATTERN):''} à {end?formatDate(end, DATE_PATTERN):''}
			</ReportTitle>
			<Content className='p-grid p-d-flex p-flex-wrap p-jc-center'>
				<ChartWrapper className="p-grid p-col-12 p-mb-3">
					<ChartContainer className='p-grid p-col p-p-3'>
						<TableTitle>Visitas por período</TableTitle>
						<Chart className='p-col-12' type='line' data={state?.lineChartData} options={lineOptions} />
					</ChartContainer>
					<ChartContainer className='p-grid p-col p-p-3'>
						<TableTitle>Visitas por propriedade</TableTitle>
						<Chart className='p-col-12' type='pie' data={state?.pizzaChartData} options={pieOptions} />
					</ChartContainer>
				</ChartWrapper>
				<Break/>
				<Block className='p-mb-3 p-p-3'>
					<TableTitle>Estatísticas das Propriedades</TableTitle>
					<DataTable emptyMessage='Nenhum item encontrado' value={state?.tecnicoTableData} className='p-rol-12' rows={5}>
						<Column field='propriedade' header='Propriedade'/>
						<Column field='cooperado' header='Cooperado'/>
						<Column field='opened' header='Em aberto'/>
						<Column field='completed' header='Concluídas'/>
						<Column field='canceled' header='Canceladas'/>
						<Column field='total' header='Total'/>
					</DataTable>
				</Block>
				<Block className="p-mb-3 p-p-3">
					<TableTitle>Visitas por Tipo</TableTitle>
					<DataTable emptyMessage='Nenhum item encontrado' value={state?.motivoTableData} className='p-rol-12' rows={5}>
						<Column field='motivo' header='Motivo'/>
						<Column field='opened' header='Em aberto'/>
						<Column field='completed' header='Concluídas'/>
						<Column field='canceled' header='Canceladas'/>
						<Column field='total' header='Total'/>
					</DataTable>
				</Block>
				<Block className="p-grid p-col-12 p-p-3">
					<TableTitle className='p-col-12 p-grid'>Dados do Técnico</TableTitle>
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