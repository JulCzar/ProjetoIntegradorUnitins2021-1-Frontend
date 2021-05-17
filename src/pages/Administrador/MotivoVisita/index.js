import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Column, confirmPopup, DataTable, Toast } from '~/primereact'
import MotivoModal from './components/MotivoDialog'
import { api, getToastInstance } from '~/services'
import { ManagementTemplate } from '~/template'

function MotivoVisita() {
	const toastRef = React.useRef(null)
	const [motivos, setMotivos] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [motivoEditado, setMotivoEditado] = React.useState(null)
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)
	
	const { control, errors, handleSubmit, reset } = useForm()
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		carregarMotivos()
	}, [])

	const carregarMotivos = async () => {
		setLoading(true)

		try {
			const { data } = await api.get('/motivos')
			
			setMotivos(data.motivos_visita)
		} catch (err) {
			toast.showWarn('Houve um erro ao obter a lista de motivos')
		} finally {
			setLoading(false)
		}
	}

	const cadastrarMotivo = async form => {
		setLoading(true)
		try {
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

	return (
		<ManagementTemplate loading={loading} title='Motivos de Visita'>
			<Toast ref={toastRef}/>
			<DataTable emptyMessage='Nenhum item encontrado' value={motivos}>
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
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Criar Novo'/>

			{/* Modal de Cadastro de Motivo */}
			<MotivoModal
				hideModal={() => setModalVisibility(false)}
				onSubmit={handleSubmit(cadastrarMotivo)}
				visible={modalVisibility}
				headerName='Criar Motivo'
				control={control}
				errors={errors}
			/>

			{/* Modal de edição de Motivo */}
			<MotivoModal
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