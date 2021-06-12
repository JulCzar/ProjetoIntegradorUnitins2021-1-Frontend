import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { paginatorTemplate } from '~/common/paginatorTemplate'
import { Column, DataTable, Toast } from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import { getApiResponseErrors } from '~/utils'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

function Visita() {
	const [visitas, setVisitas] = React.useState([])

	const [permissions, setPermissions] = React.useState([])
	const [loading, setLoading] = React.useState(false)

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		loadVisits()
		updatePermissions()
		store.subscribe(updatePermissions)
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

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}

	if (!permissions.includes(1)) return <PageNotFound/>

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