import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import React from 'react'

import { AutoComplete, Button, Column, confirmPopup, DataTable, Divider, InputMask, InputText, OverlayPanel, Toast} from '~/primereact'
import { getApiResponseErrors, getInvalidClass, getPhoneObject, getStringNormalized } from '~/utils'
import { CardHeader, InputContainer, } from '~/common/components'
import { ManagementTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import Modal from './components/Modal'

function Perfil() {
	// formulários
	const { control, errors, handleSubmit, setValue, reset } = useForm()
	const transferPropriedadeForm = useForm()
	const editPropriedadeForm = useForm()
	const novaPropriedadeForm = useForm()
	
	// referencias
	const overlayTransfer = React.useRef(null)
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	// listas
	const [cooperadoSuggestions, setCoopSuggestions] = React.useState([])
  const [propriedades, setPropriedades] = React.useState([])
	const [cooperados, setCooperados] = React.useState([])
  const [tecnicos, setTecnicos] = React.useState([])

	// visibilidade de overlay
	const [editingModalVisibility, setEditingModalVisibility] = React.useState(false)
  const [editingProperty, setEditingProperty] = React.useState(false)
  const [modalVisibility, setModalVisibility] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  
	// Dados
  const [propriedadeEmEdicao, setDadosPropriedade] = React.useState(null)
	const [data, setData] = React.useState(null)


	const { id } = useParams()
	const history = useHistory()

	React.useEffect(() => {
		carregarPerfil()
		carregarTecnicos()
		carregarCooperados()
		carregarPropriedades()
	}, [])

	async function carregarPerfil() {
		try {
			setLoading(true)
			
			const { data } = await api.get(`/cooperado/data/${id}`)

			setData(data)

			reset()

			Object.entries(data).forEach(([key, value]) => setValue(key, value))
		} catch (error) {
			history.push('/error')
		} finally {
			setLoading(false)
		}
	}

	async function carregarPropriedades() {
		try {
			setLoading(true)
			
			const { data } = await api.get(`/propriedades/${id}`)

			setPropriedades(data)

			reset()

			Object.entries(data).forEach(([key, value]) => setValue(key, value))
		} catch (error) {
			history.push('/error')
		} finally {
			setLoading(false)
		}
	}

	async function carregarCooperados() {
		setLoading(true)
		try {
			const { data } = await api.get('/cooperado/index')
			setCooperados(data)
		} catch (err) {}
		finally {
			setLoading(false)
		}
	}

	async function carregarTecnicos() {
		setLoading(true)
		try {
			const { data } = await api.get('/tecnico/index')
			
			setTecnicos(data)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)	
		}
	}

	async function editarPerfil(form) {
		const {phone, ...data } = form
		const telefone = getPhoneObject(phone)
		if (!telefone) return toast.showError('O número de telefone providenciado é inválido')
		
		try {
			setLoading(true)

			await api.put(`/cooperado/${id}`, {...data, telefone})

			toast.showSuccess('Dados Alterados')
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
			setEditing(false)
		}
	}

	async function editarPropriedade(form) {
		const data = {
			...form,
			id_tecnico: form.tecnico.id,
			id_cooperado: id
		}
		try {
			setLoading(true)
			
			await api.put(`/propriedade/${propriedadeEmEdicao.id}`, data)

			toast.showSuccess('Dados Salvos')

			setEditingModalVisibility(false)

			carregarPropriedades()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
			setEditingProperty(false)
		}
	}

	async function cadastrarPropriedade(form) {
		const data = {
			...form,
			id_tecnico: form.tecnico.id,
			id_cooperado: id
		}
		try {
			setLoading(true)

			await api.post('/propriedade/store', data)

			toast.showSuccess('Dados Salvos')

			setModalVisibility(false)

			carregarPropriedades()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	async function transferProperty(form) {
		const cooperado = form.cooperado.id
		
		try {
			await api.put(`propriedade/transferir/${propriedadeEmEdicao.id}`, {cooperado})

			toast.showSuccess('Propriedade transferida com sucesso')

			setEditingModalVisibility(false)

			setDadosPropriedade(null)

			carregarPropriedades()
		} catch ({ response }) {
			toast.showError(getApiResponseErrors(apiResponse))
		}
	}

	const handleEdit = rowData => {
		setEditingModalVisibility(true)
		
		const propriedade = {
			...rowData,
			tecnico: tecnicos
				.filter(i => rowData.id_tecnico == i.id)
				.pop()
		}
		
		setDadosPropriedade(propriedade)

	}

	const cancelEdit = () => {
		editPropriedadeForm.reset()
		setEditingProperty(false)
		setEditing(false)
		reset()
	}

	const hideModal = () => {
		setEditing(false)
		setEditingProperty(false)
		setModalVisibility(false)
		
		setEditingModalVisibility(false)
	}

	const confirmDisable = event => {
    confirmPopup({
			target: event.currentTarget,
			message: 'Deseja desativar esse cooperado?',
			icon: 'pi pi-exclamation-triangle',
			async accept() {
				setLoading(true)
				try {
					await api.put(`/cooperado/${id}/disable`)

					toast.showSuccess('O Cooperado não será mais listado para visitas.')
				} catch ({ response }) {
					const hasApiResponse = response?.data?.errors
					toast.showWarns(hasApiResponse?response?.data?.errors:['Houve um erro ao processar a requisição.'])
				} finally {
					carregarPerfil()
					setLoading(false)
				}
			}
    })
	}

	const confirmEnable = event => {
    confirmPopup({
			target: event.currentTarget,
			message: 'Deseja ativar esse cooperado?',
			icon: 'pi pi-exclamation-triangle',
			async accept() {
				try {
					await api.put(`/cooperado/${id}/enable`)

					toast.showSuccess('O cooperado esta disponível para visitas novamente.')
				} catch ({ response }) {
					const hasApiResponse = response?.data?.errors
					toast.showWarns(hasApiResponse?response?.data?.errors:['Houve um erro ao processar a requisição.'])
				} finally {
					carregarPerfil()
					setLoading(false)
				}
			}
    })
	}

	const completeCooperado = evt => {
		const normalizedQuery = getStringNormalized(evt.query.toLowerCase())
		
		const filteredCooperados = [...cooperados].filter(c => {
			const normalizedCPF = getStringNormalized(c.cpf_cooperado.toLowerCase())
			
			return normalizedCPF.startsWith(normalizedQuery)
		})

		setCoopSuggestions(filteredCooperados)
	}

	return (
		<ManagementTemplate loading={loading} title='Perfil'>
			<Toast ref={toastRef}/>
			{/* Dados do Cooperado */}
			<form onSubmit={handleSubmit(editarPerfil)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						control={control}
						rules={validate.name}
						defaultValue={data?data.nome:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Nome'>
								<InputText
									name={name}
									value={value}
									disabled={!editing} 
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='sobrenome'
						control={control}
						rules={validate.lastname}
						defaultValue={data?data.sobrenome:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Sobrenome'>
								<InputText
									name={name}
									value={value}
									disabled={!editing} 
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<Controller
					name='email'
					control={control}
					rules={validate.email}
					defaultValue={data?data.email:''}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Email'>
							<InputText
								name={name}
								value={value}
								disabled={!editing}	
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='phone'
						control={control}
						rules={validate.phone}
						defaultValue={data?data.phone:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Telefone'>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}	
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='cpf'
						control={control}
						rules={validate.cpf}
						defaultValue={data?data.cpf:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='CPF'>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<InputWrapper columns={2} gap='10px'>
					{(!editing && !!data?.status) && <Button type='button' onClick={confirmDisable} label='Desativar Perfil'/>}
					{(!editing && !data?.status) && <Button type='button' onClick={confirmEnable} label='Ativar Perfil'/>}
					{!editing && <Button onClick={() => setEditing(true)} label='Editar Perfil'/>}
					{editing && <Button onClick={cancelEdit} type='button' label='Cancelar'/>}
					{editing && <Button label='Salvar'/>}
				</InputWrapper>
			</form>
			
			<Divider className='p-mt-5'/>
			{/* Lista de Propriedades */}
			<CardHeader title='Propriedades'/>
			<DataTable emptyMessage='Nenhum item encontrado' value={propriedades} className="p-datatable-striped">
				<Column field="nome" header="Nome"/>
				<Column field="localidade" header="Localidade"/>
				<Column
					className='p-d-flex p-jc-center'
					header='Ações'
					body={rowData => (
						<a onClick={() => handleEdit(rowData)}>Detalhes</a>
					)}/>
			</DataTable>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Nova Propriedade'/>
			
			{/* Modal de Edição da Propriedade */}
			<Modal
				onSubmit={editPropriedadeForm.handleSubmit(editarPropriedade)}
				control={editPropriedadeForm.control}
				errors={editPropriedadeForm.errors}
				headerName='Dados da Propriedade'
				visible={editingModalVisibility}
				formData={propriedadeEmEdicao}
				editable={editingProperty}
				hideModal={hideModal}
				tecnicos={tecnicos}
				buttons={
					<InputWrapper columns={2} gap='10px'>
						{!editingProperty && <Button type='button' onClick={e => overlayTransfer.current.toggle(e)} aria-haspopup aria-controls="overlay_panel" label='Transferir Propriedade'/>}
						{!editingProperty && <Button onClick={() => setEditingProperty(true)} label='Editar'/>}
						{editingProperty && <Button type='button' onClick={cancelEdit} label='Cancelar'/>}
						{editingProperty && <Button label='Salvar'/>}
						
					</InputWrapper>
				}
			/>
			{/* Modal de Cadastro de Propriedade */}
			<Modal
				onSubmit={novaPropriedadeForm.handleSubmit(cadastrarPropriedade)}
				control={novaPropriedadeForm.control}
				buttons={<Button label='Adicionar'/>}
				errors={novaPropriedadeForm.errors}
				headerName='Cadastrar Propriedade'
				visible={modalVisibility}
				hideModal={hideModal}
				tecnicos={tecnicos}
			/>
			<OverlayPanel ref={overlayTransfer} showCloseIcon id="overlay_panel" style={{width: '450px'}} className="p-px-3 p-pb-3">
				<CardHeader title='Transferir Propriedade'/>
				<p>Informe o CPF do Cooperado que receberá a propriedade</p>
				<form onSubmit={transferPropriedadeForm.handleSubmit(transferProperty)} className='p-fluid'>
					<Controller
						defaultValue=''
						name='cooperado'
						rules={{required: 'É Necessário selecionar o Cooperado que receberá a propriedade.'}}
						control={transferPropriedadeForm.control}
						render={({name, value, onChange}) => (
						<InputContainer name={name} error={transferPropriedadeForm.errors[name]}>
							<AutoComplete
								name={name}
								value={value}
								forceSelection
								placeholder='CPF'
								field='nome_cooperado'
								onChange={e => onChange(e.value)}
								suggestions={cooperadoSuggestions}
								completeMethod={completeCooperado}
								className={getInvalidClass(transferPropriedadeForm.errors[name])}
							/>
						</InputContainer>
					)}/>
					<Button >Transferir</Button>
				</form>
			</OverlayPanel>
		</ManagementTemplate>
	)
}

export default Perfil