import React from 'react'
import { Link } from 'react-router-dom'
import { Column, DataTable, Toast } from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import { getApiResponseErrors } from '~/utils'
import { format } from 'date-fns'

function Visita() {
	const [visitas, setVisitas] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		loadVisits()
	}, [])

	async function loadVisits() {
		try {
			setLoading(true)

			const { data } = await api.get('/historico')

			const modifiedList = data.map(v => ({...v, dia_visita: format(new Date(v.dia_visita), 'dd/MM/yyyy')}))

			setVisitas(modifiedList)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	return (
		<ManagementTemplate title='Histórico de Visitas' loading={loading}>
			<Toast ref={toastRef}/>
			<DataTable emptyMessage='Nenhum item encontrado' value={visitas} className="p-datatable-striped" paginator rows={7}>
				<Column field="dia_visita" header="Data da Visita"></Column>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="nome_cooperado" header="Cooperado"/>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} field="nome_tecnico" header="Técnico"/>
				<Column headerStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center'}} header="Ações" body={rowData => (
					<div className='p-d-flex p-jc-around'>
						<Link to={`/historico/visita/${rowData.id}`}>detalhes</Link>
						<i className='fas fa-print'/>
					</div>
				)}/>
			</DataTable>
		</ManagementTemplate>
	)
}

export default Visita