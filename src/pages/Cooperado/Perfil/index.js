import { Controller, useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router'
import React from 'react'

import { Button, Column, DataTable, Divider, InputMask, InputText, Toast} from '~/primereact'
import { CardHeader, InputContainer, } from '~/common/components'
import { ManagementTemplate } from '~/pages/templates'
import * as validation from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import { getInvalidClass, getPhoneObject } from '~/utils'
import Modal from './components/Modal'
import { api, getToastInstance } from '~/services'

function Perfil() {
	const { control, errors, handleSubmit, setValue, reset } = useForm()
	const editPropriedadeModal = useForm()
	const novaPropriedadeModal = useForm()
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const { id } = useParams()
	const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [, setTecnicos] = React.useState([])
  const [dadosCooperado, setDadosCooperado] = React.useState(null)
  const [editingProperty, setEditingProperty] = React.useState(false)
  const [modalVisibility, setModalVisibility] = React.useState(false)
  const [dadosPropriedade, setDadosPropriedade] = React.useState(null)
	const [editingModalVisibility, setEditingModalVisibility] = React.useState(false)

	React.useEffect(() => {
		carregarDados()
		carregarTecnicos()
	}, [])

	async function carregarTecnicos() {
		try {
			const { data } = await api.get('/tecnico/index')
			
			setTecnicos(data)
		} catch ({ response }) {
			const apiResponse = response?.data?.errors 
			toast.showErrors(apiResponse?apiResponse:['Houve um erro ao processar a requisição'])
		} 
	}

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

	async function editarPerfil(form) {
		const {phone, ...data } = form
		const telefone = getPhoneObject(phone)
		if (!telefone) return toast.showError('O número de telefone providenciado é inválido')
		
		try {
			setLoading(true)

			await api.put(`/cooperado/${id}`, {...data, telefone})

			toast.showSuccess('Dados Alterados')
		} catch ({ response }) {
			const apiResponse = response?.data?.errors
			toast.showErrors(apiResponse||['Não foi possível processar a requisição'])
		} finally {
			setLoading(false)
			setEditing(false)
		}
	}

	const editarPropriedade = form => {
		console.log(form) // eslint-disable-line
		setLoading(true)

		setTimeout(setLoading, 500, false)
		setTimeout(setEditingProperty, 500, false)
	}

	const cadastrarPropriedade = form => {
		console.log(form) // eslint-disable-line
		setLoading(true)

		setTimeout(setLoading, 500, false)
		setTimeout(setEditingProperty, 500, false)
	}

	const handleEdit = rowData => {
		setEditingModalVisibility(true)
		setDadosPropriedade(rowData)
	}

	const cancelEdit = () => {
		setEditing(false)
		reset()
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
						rules={validation.nameValidation}
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
						rules={validation.lastnameValidation}
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
					rules={validation.emailValidation}
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
						rules={validation.phoneValidation}
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
						rules={validation.cpfValidation}
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
			<DataTable emptyMessage='Nenhum item encontrado' value={dadosCooperado?.propriedades || []} className="p-datatable-striped">
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
				onSubmit={editPropriedadeModal.handleSubmit(editarPropriedade)}
				hideModal={() => setEditingModalVisibility(false)}
				control={editPropriedadeModal.control}
				errors={editPropriedadeModal.errors}
				headerName='Dados da Propriedade'
				visible={editingModalVisibility}
				formData={dadosPropriedade}
				editable={editingProperty}
				buttons={
					<InputWrapper columns={2} gap='10px'>
						{!editingProperty && <Button onClick={() => setEditingProperty(true)} label='Editar'/>}
						{editingProperty && <Button label='Salvar'/>}
						<Button type='button' label='Transferir Propriedade'/>
						
					</InputWrapper>
				}
			/>

			{/* Modal de Cadastro de Propriedade */}
			<Modal
				onSubmit={novaPropriedadeModal.handleSubmit(cadastrarPropriedade)}
				hideModal={() => setModalVisibility(false)}
				control={novaPropriedadeModal.control}
				errors={novaPropriedadeModal.errors}
				headerName='Cadastrar Propriedade'
				visible={modalVisibility}
				buttons={<Button label='Cadastrar'/>}
			/>
		</ManagementTemplate>
	)
}

export default Perfil