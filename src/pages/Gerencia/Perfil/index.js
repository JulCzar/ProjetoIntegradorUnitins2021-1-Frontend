import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Dialog, InputMask, InputText, Password, Toast} from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { InputContainer, passwordFooter, passwordHeader } from '~/common/components'
import * as validate from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import { api, getToastInstance } from '~/services'
import { getApiResponseErrors, getInvalidClass, getPhoneObject, verifyPassword } from '~/utils'

function Perfil() {
	const [data, setData] = React.useState(null)

	const { control, errors, handleSubmit, reset, setValue } = useForm()
	const editPassForm = useForm()

  const [editing, setEditing] = React.useState(false)
  const [editPassModal, setEditPassModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
	const formRef = React.useRef(null)

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		loadData()
	}, [])

	async function loadData() {
		try {
			setLoading(true)

			const { data } = await api.get('/profile')

			setData(data)

			reset()

			Object.entries(data).forEach(([k, v]) => setValue(k, v))
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	async function trocarSenha(form) {
		const { senha, passwordConfirm } = form
		const passwordValidate = verifyPassword(senha, passwordConfirm)

		if (!passwordValidate.isValid)
			return toast.showErrors(passwordValidate.errors)
		
		try {
			await api.put('/profile/password', {senha})

			toast.showSuccess('Senha foi Alterada')

			setEditPassModal(false)

			editPassForm.reset()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		}
	}
	
	const cancel = () => {
		setEditing(false)
		
		reset()

		Object.entries(data).forEach(([k, v]) => setValue(k, v))
	}

	async function editProfile(form) {
		const {phone, ...data } = form
		const telefone = getPhoneObject(phone)
		if (!telefone) return toast.showError('O número de telefone providenciado é inválido')

		try {
			setLoading(true)
			await api.put('/profile', {...data, telefone})

			toast.showSuccess('Perfil Editado com Sucesso')

			loadData()

			setEditing(false)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	return (
		<ManagementTemplate title='Perfil' loading={loading}>
			<Toast ref={toastRef}/>
			<form ref={formRef} onSubmit={handleSubmit(editProfile)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue={data?data.nome:''}
						control={control}
						rules={validate.name}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Nome' error={errors[name]}>
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
							<InputContainer name={name} label='Sobrenome' error={errors[name]}>
								<InputText
									name={name}
									value={value}
									disabled={!editing}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}/>
				</InputWrapper>
				<Controller name='email'
					control={control}
					rules={validate.email}
					defaultValue={data?data.email:''}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Email' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='phone'
						control={control}
						rules={validate.phone}
						defaultValue={data?data.phone:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Telefone' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}/>
						<Controller
							name='cpf'
							control={control}
							rules={validate.cpf}
							defaultValue={data?data.cpf:''}
							render={({ name, value, onChange }) => (
								<InputContainer name={name} label='CPF' error={errors[name]}>
									<InputMask
										name={name}
										value={value}
										disabled={!editing}
										mask='999.999.999-99'
										className={getInvalidClass(errors[name])}
										onChange={evt => onChange(evt.target.value)}
									/>
								</InputContainer>
							)}/>
				</InputWrapper>
				<InputWrapper columns={2} gap='10px'>
					{!editing && <Button type='button' onClick={() => setEditPassModal(true)} label='Alterar Senha'/>}
					{!editing && <Button type='button' onClick={() => setEditing(true)} label='Editar Perfil'/>}
					{editing && <Button type='button' onClick={cancel} label='Cancelar'/>}
					{editing && <Button label='Salvar'/>}
				</InputWrapper>        
			</form>
			<Dialog
				draggable={false}
				visible={editPassModal}
				header='Alterar a senha'
				style={{width: '350px'}}
				onHide={() => setEditPassModal(false)}
			>
				<form onSubmit={editPassForm.handleSubmit(trocarSenha)} className='p-fluid'>
					<Controller
						name='senha'
						defaultValue=''
						rules={validate.password}
						control={editPassForm.control}
						render={({ name, onChange, value }) => (
							<InputContainer
								name={name}
								label='Nova senha'
								error={editPassForm.errors[name]}>
								<Password
									name={name}
									value={value}
									header={passwordHeader}
									footer={passwordFooter}
									onChange={evt => onChange(evt.target.value)}
									className={getInvalidClass(editPassForm.errors[name])}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='passwordConfirm'
						defaultValue=''
						rules={validate.password}
						control={editPassForm.control}
						render={({ name, onChange, value }) => (
							<InputContainer
								name={name}
								label='Confirme a nova senha'
								error={editPassForm.errors[name]}>
								<Password
									name={name}
									value={value}
									feedback={false}
									onChange={evt => onChange(evt.target.value)}
									className={getInvalidClass(editPassForm.errors[name])}
								/>
							</InputContainer>
						)}
					/>
					<Button className='p-mt-3 p-d-flex p-jc-center'>Alterar Senha</Button>
				</form>
			</Dialog>
		</ManagementTemplate>
	)
}

export default Perfil