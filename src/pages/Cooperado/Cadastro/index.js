import React from 'react'
import { useHistory } from 'react-router'
import { Controller, useForm } from 'react-hook-form'

import { getApiResponseErrors, getInvalidClass, getPhoneObject } from '~/utils'
import { Button, InputMask, InputText, ListBox, Toast} from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { InputContainer } from '~/common/components'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import Modal from './components/Modal'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

const Cadastro = () => {
	const { control, errors, handleSubmit, reset} = useForm()
	const modalForm = useForm()

	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [propriedades, setProperties] = React.useState([])
	const [permissions, setPermissions] = React.useState([])
	const [tecnicos, setTecnicos] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [propriedadeEmEdicao] = React.useState(null)
	const history = useHistory()
	
	const toastRef = React.useRef(null)

	const hideModal = () => setModalVisibility(false)
	const showModal = () => setModalVisibility(true)

	React.useEffect(() => {
		carregarTecnicos()
		updatePermissions()
		store.subscribe(updatePermissions)
	},[])

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}

	async function carregarTecnicos() {
		try {
			setLoading(true)
			const { data } = await api.get('/tecnico/index')
			
			setTecnicos(data)
		} catch ({ response }) {
			const toast = getToastInstance(toastRef)
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)	
		}
	}
	
	function addProperty(form) {
		setProperties([...propriedades, form])
		hideModal()
	}

	async function cadastrar(form) {
		const toast = getToastInstance(toastRef)
		if (!propriedades.length) return toast.showWarn('É necessário inserir pelo menos uma propriedade')

		for (const p of propriedades) p.id_tecnico = p.id_tecnico.id

		const {phone, ...data } = form
		const telefone = getPhoneObject(phone)
		if (!telefone) return toast.showError('O número de telefone providenciado é inválido')

		try {
			setLoading(true)
			await api.post('/cooperado/store', {...data, telefone, propriedades})

			reset()
			setProperties([])

			toast.showSuccess('Cadastro realizado com sucesso')
			toast.showInfo('Você será redirecionado em 2 segundos')
			setTimeout(history.goBack, 2000)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)	
		}
	}

	if (!permissions.includes(2)) return <PageNotFound/>

	return (
		<ManagementTemplate title='Cadastro de Cooperado' loading={loading}>
			<Toast ref={toastRef}/>

			<form onSubmit={handleSubmit(cadastrar)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue=''
						control={control}
						rules={validate.name}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Nome'>
								<InputText
									name={name}
									value={value}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						defaultValue=''
						name='sobrenome'
						control={control}
						rules={validate.lastname}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Sobrenome'>
								<InputText
									name={name}
									value={value}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<Controller
					name='email'
					defaultValue=''
					control={control}
					rules={validate.email}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Email'>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='cpf'
						defaultValue=''
						control={control}
						rules={validate.cpf}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='CPF'>
								<InputMask
									name={name}
									value={value}
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='phone'
						defaultValue=''
						control={control}
						rules={validate.phone}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Telefone'>
								<InputMask
									name={name}
									value={value}
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<h2>Propriedades</h2>
				{propriedades.length
					?<ListBox
						className='p-mb-5'
						options={propriedades}
						optionLabel='nome'/>
					:<h3>É Necessário adicionar pelo menos uma propriedade</h3>
				}
				<InputWrapper columns={2} gap='10px'>
					<Button type='button' label='Adicionar Propriedade' onClick={showModal}/>
					<Button label='Cadastrar'/>
				</InputWrapper>
			</form>

			{/* Modal de cadastro da propriedade */}
			<Modal
				tecnicos={tecnicos}
				hideModal={hideModal}
				errors={modalForm.errors}
				visible={modalVisibility}
				control={modalForm.control}
				formData={propriedadeEmEdicao}
				headerName='Dados da Propriedade'
				onSubmit={modalForm.handleSubmit(addProperty)}
			/>
		</ManagementTemplate>
	)
}

export default Cadastro