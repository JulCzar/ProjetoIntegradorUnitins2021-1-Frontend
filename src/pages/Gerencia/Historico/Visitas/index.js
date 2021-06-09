import React from 'react'
import { Link } from 'react-router-dom'
import { Column, DataTable, Toast } from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import { getApiResponseErrors } from '~/utils'
import { format } from 'date-fns'
import { paginatorTemplate } from '~/common/paginatorTemplate'

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
			<DataTable
				rows={7}
				paginator
				value={visitas}
				rowsPerPageOptions={[7,15,30]}
				className="p-datatable-striped"
				emptyMessage='Nenhum item encontrado'
				paginatorTemplate={paginatorTemplate}
			>
				<Column field="dia_visita" header="Data da Visita"></Column>
				<Column field="nome_cooperado" header="Cooperado"/>
				<Column field="nome_tecnico" header="Técnico"/>
				<Column
					header="Ações"
					bodyStyle={{textAlign: 'center'}}
					headerStyle={{textAlign: 'center'}}
					body={rowData => <Link to={`/historico/visita/${rowData.id}`}>detalhes</Link>}
				/>
			</DataTable>
		</ManagementTemplate>
	)
}

export default Visita