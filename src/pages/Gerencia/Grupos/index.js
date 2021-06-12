import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Column, confirmPopup, DataTable, Toast } from '~/primereact'

import { permissions as RegisteredPermissions } from '~/config/permissions'
import { ManagementTemplate } from '~/pages/templates'

import Modal from './components/Modal'
import { api, getToastInstance } from '~/services'
import { paginatorTemplate } from '~/common/paginatorTemplate'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

function ListarGrupos() {
	const [grupos, setGrupos] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [editingGroup, setEditingGroup] = React.useState(null)
	const [registerModalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)
	const { control, errors, handleSubmit, reset, setValue } = useForm()
	const [permissions, setPermissions] = React.useState([])
	
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)
	
	React.useEffect(() => {
		carregarGrupos()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	async function carregarGrupos() {
		setLoading(true)
		try {
			const { data } = await api.get('/grupos')

			setGrupos(data)
		} catch (err) {
			toast.showError('Houve um erro ao carregar a lista de grupos')
		} finally {
			setLoading(false)
		}
	}

	const registerGroup = async form => {
		setLoading(true)

		try {
			await api.post('/grupos', form)

			toast.showSuccess('Grupo Cadastrado')
		} catch ({ response }) {
			const hasApiResponse = response?.data?.errors
			toast.showErrors(hasApiResponse?response.data.errors:['Houve um erro ao processar a requisição'])
		} finally {
			setLoading(false)
			setModalVisibility(false)
			carregarGrupos()
		}
		reset()
	}

	const editGroup = async form => {
		setLoading(true)

		try {
			await api.put(`/grupos/${editingGroup.id}`, form)

			toast.showSuccess('Salvo!')
		} catch ({ response }) {
			const hasApiResponse = response?.data?.errors
			toast.showErrors(hasApiResponse?response.data.errors:['Houve um erro ao processar a requisição'])
		} finally {
			setLoading(false)
			setEditModalVisibility(false)
			carregarGrupos()
		}

		Object.entries(editingGroup).forEach(data => setValue(...data))
		reset()
	}

	const deleteGroup = async data => {
		setLoading(true)
		
		try {
			await api.delete(`/grupos/${data.id}`)

			toast.showSuccess(`Grupo "${data.nome}" Excluído`)
		} catch ({ response }) {
			const hasApiResponse = response?.data?.errors
			toast.showErrors(hasApiResponse?response.data.errors:['Houve um erro ao processar a requisição'])
		} finally {
			setLoading(false)
			carregarGrupos()
		}

		reset()
	}

	const handleEdit = data => {
		setEditingGroup(data)
		setEditModalVisibility(true)
		Object.entries(data).forEach(data => setValue(...data))
	}

	const handleDelete = (evt, data) => {
		confirmPopup({
			target: evt.currentTarget,
			message: 'Deseja realmente apagar esse grupo?',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			accept() {
				deleteGroup(data)
			}
		})
	}

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}

	if (!permissions.includes(4)) return <PageNotFound/>
		
	return (
		<ManagementTemplate title='Grupos' loading={loading}>
			<Toast ref={toastRef}/>

			{/* Tabela com listagem de grupos */}
			<DataTable
				rows={7}
				paginator
				value={grupos}
				rowsPerPageOptions={[7,15,30]}
				emptyMessage='Nenhum item encontrado'
				paginatorTemplate={paginatorTemplate}
			>
				<Column field="nome" header="Nome"/>
				<Column bodyClassName='p-d-flex p-jc-around' headerStyle={{textAlign: 'center'}} header="Ações" body={rowData => (
					<React.Fragment>
						<a onClick={() => handleEdit(rowData)}>Editar</a>
						<a onClick={evt => handleDelete(evt, rowData)}>Excluir</a>
					</React.Fragment>
				)}/>
			</DataTable>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Criar Novo'/>

			{/* Modal de Cadastro de grupo */}
			<Modal
				errors={errors}
				control={control}
				headerName='Criar Grupo'
				options={RegisteredPermissions}
				visible={registerModalVisibility}
				onSubmit={handleSubmit(registerGroup)}
				onHide={() => setModalVisibility(false)}
				buttons={<Button label='Adicionar'/>}
			/>

			{/* Modal de Edição de grupo */}
			<Modal
				errors={errors}
				control={control}
				headerName='Editar Grupo'
				visible={editModalVisibility}
				options={RegisteredPermissions}
				onSubmit={handleSubmit(editGroup)}
				formData={editingGroup}
				onHide={() => setEditModalVisibility(false)}
				buttons={<Button label='Salvar'/>}
			/>
		</ManagementTemplate>
	)
}

export default ListarGrupos