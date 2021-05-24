import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import React from 'react'

import { Button, Column, DataTable, Divider, InputMask, InputText, Toast} from '~/primereact'
import { CardHeader, InputContainer, } from '~/common/components'
import { ManagementTemplate } from '~/pages/templates'
import * as validate from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import { getApiResponseErrors, getInvalidClass, getPhoneObject } from '~/utils'
import Modal from './components/Modal'
import { api, getToastInstance } from '~/services'

function Perfil() {
	const { control, errors, handleSubmit, setValue, reset } = useForm()
	const editPropriedadeForm = useForm()
	const novaPropriedadeForm = useForm()
	
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const { id } = useParams()
	const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [tecnicos, setTecnicos] = React.useState([])
  const [propriedades, setPropriedades] = React.useState([])
  const [dadosCooperado, setDadosCooperado] = React.useState(null)
  const [editingProperty, setEditingProperty] = React.useState(false)
  const [modalVisibility, setModalVisibility] = React.useState(false)
  const [dadosPropriedade, setDadosPropriedade] = React.useState(null)
	const [editingModalVisibility, setEditingModalVisibility] = React.useState(false)

	React.useEffect(() => {
		carregarDados()
		carregarTecnicos()
		carregarPropriedades()
	}, [])

	async function carregarDados() {
		try {
			setLoading(true)
			
			const { data } = await api.get(`/cooperado/data/${id}`)

			setDadosCooperado(data)

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
			
			await api.put(`/propriedade/${dadosPropriedade.id}`, data)

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
		setEditingModalVisibility(false)
		setModalVisibility(false)
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
						defaultValue={dadosCooperado?dadosCooperado.nome:''}
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
						defaultValue={dadosCooperado?dadosCooperado.sobrenome:''}
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
					defaultValue={dadosCooperado?dadosCooperado.email:''}
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
						defaultValue={dadosCooperado?dadosCooperado.phone:''}
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
						defaultValue={dadosCooperado?dadosCooperado.cpf:''}
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
					{!editing && <Button type='button' label='Desativar Perfil'/>}
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
				formData={dadosPropriedade}
				editable={editingProperty}
				hideModal={hideModal}
				tecnicos={tecnicos}
				buttons={
					<InputWrapper columns={2} gap='10px'>
						{!editingProperty && <Button type='button' label='Transferir Propriedade'/>}
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
		</ManagementTemplate>
	)
}

export default Perfil