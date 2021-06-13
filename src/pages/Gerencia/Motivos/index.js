import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Column, confirmPopup, DataTable, Toast } from '~/primereact'
import { paginatorTemplate } from '~/common/paginatorTemplate'
import { ManagementTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import Modal from './components/Modal'
import { PageNotFound } from '~/pages'
import { store } from '~/store'
import DTResponsive from '~/common/components/DTResponsive'

function MotivoVisita() {
	const toastRef = React.useRef(null)
	const [motivos, setMotivos] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [permissions, setPermissions] = React.useState([])
	const [motivoEditado, setMotivoEditado] = React.useState(null)
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)
	
	const { control, errors, handleSubmit, reset } = useForm()
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		carregarMotivos()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}


	const carregarMotivos = async () => {
		setLoading(true)
		
		try {
			const { data } = await api.get('/motivos')
			
			setMotivos(data)
		} catch (err) {
			toast.showWarn('Houve um erro ao obter a lista de motivos')
		} finally {
			setLoading(false)
		}
	}

	const cadastrarMotivo = async form => {
		try {
			setLoading(true)
			
			await api.post('/motivos', form)
			
			toast.showSuccess('Motivo cadastrado com sucesso.')
			
			carregarMotivos()
		} catch (error) {
			toast.showError('Houve um erro ao cadastrar')
		} finally {
			setLoading(false)
			setModalVisibility(false)
		}
		
		reset()
	}
	
	const editarMotivo = async form => {
		setLoading(true)
		try {
			await api.put(`/motivos/${form.id}`, form)
			
			toast.showSuccess('Motivo alterado com sucesso.')
			
			carregarMotivos()
		} catch (error) {
			toast.showError('Houve um erro ao cadastrar')
		} finally {
			setLoading(false)
			setEditModalVisibility(false)
		}
		
		reset()
	}
	
	const excluirMotivo = async form => {
		setLoading(true)
		try {
			await api.delete(`/motivos/${form.id}`)
			
			toast.showSuccess('Motivo excluído com sucesso.')
			
			carregarMotivos()
		} catch (error) {
			toast.showError('Houve um erro ao apagar')
		} finally {
			setLoading(false)
		}
		
		reset()
	}
	
	const handleEdit = data => {
		setMotivoEditado(data)
		setEditModalVisibility(true)
	}
	
	const confirmDelete = (form, evt) => {
		confirmPopup({
			target: evt.currentTarget,
			message: 'Deseja realmente apagar esse motivo?',
			icon: 'pi pi-info-circle',
			acceptClassName: 'p-button-danger',
			accept() {
				excluirMotivo(form)
			}
		})
	}
	
	if (!permissions.includes(5)) return <PageNotFound/>

	return (
		<ManagementTemplate loading={loading} title='Motivos de Visita'>
			<Toast ref={toastRef}/>
			<DTResponsive>
				<DataTable emptyMessage='Nenhum item encontrado' value={motivos} paginator rows={7} rowsPerPageOptions={[7,15,30]} paginatorTemplate={paginatorTemplate}>
					<Column field="nome" header="Name"/>
					<Column
						bodyClassName='p-d-flex p-jc-around'
						headerStyle={{textAlign: 'center'}}
						header="Ações"
						body={rowData => (
						<React.Fragment>
							<a onClick={() => handleEdit(rowData)}>Editar</a>
							<a onClick={(...rest) => confirmDelete(rowData, ...rest)}>Excluir</a>
						</React.Fragment>
						)}/>
				</DataTable>
			</DTResponsive>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Criar Novo'/>

			{/* Modal de Cadastro de Motivo */}
			<Modal
				hideModal={() => setModalVisibility(false)}
				onSubmit={handleSubmit(cadastrarMotivo)}
				visible={modalVisibility}
				headerName='Criar Motivo'
				control={control}
				errors={errors}
			/>

			{/* Modal de edição de Motivo */}
			<Modal
				hideModal={() => {
					setMotivoEditado(null)
					setEditModalVisibility(false)
				}}
				onSubmit={handleSubmit(editarMotivo)}
				visible={editModalVisibility}
				headerName='Editar Motivo'
				formData={motivoEditado}
				control={control}
				errors={errors}
			/>
		</ManagementTemplate>
	)
}

export default MotivoVisita