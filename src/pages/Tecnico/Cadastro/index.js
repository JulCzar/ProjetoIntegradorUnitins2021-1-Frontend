import React from 'react'
import { useHistory } from 'react-router'
import { Controller, useForm } from 'react-hook-form'

import { InputWrapper } from '~/common/styles'
import { InputContainer, passwordFooter, passwordHeader } from '~/common/components'
import {  api, getToastInstance } from '~/services'
import { Button, Dropdown, InputMask, InputText, Password, Toast } from '~/primereact'
import { verifyPassword, getPhoneObject, getInvalidClass } from '~/utils'
import { ManagementTemplate } from '~/template'
import * as validation from '~/config/validations'

const Cadastro = () => {
	const history = useHistory()
	const toastRef = React.useRef(null)
	const [loading, setLoading] = React.useState(false)
	const [groupOptions] = React.useState([{label: 'Cooperado', value: 1}])
	
	const { control, errors, handleSubmit, reset } = useForm()

	const toast = getToastInstance(toastRef)

	async function cadastrar(form) {
		setLoading(true)
		const { passwordConfirm, phone, ...data } = form
		const passwordCheck = verifyPassword(data.senha, passwordConfirm)
		const telefone = getPhoneObject(phone)
		
		if (!passwordCheck.isValid || !telefone) {
			setLoading(false)
			if (!passwordCheck.isValid) return toast.showInfos(passwordCheck.errors)
			if (!telefone) return toast.showError('O número de telefone providenciado é inválido')
		}
		
		try {
			await api.post('/tecnico/store', {...data, telefone})

			toast.showSuccess('Cadastro Realizado com Sucesso!')
			toast.showInfo('Você sera redirecionado para a tela de listagem em 2 segundo')

			setTimeout(history.push, 2000, '/tecnico')

			reset()
		}catch ({ response }) {
			const errors = Object.values(response.data.errors) ?? ['Ocorreu um erro ao processar a requisição']
			toast.showInfos(errors)
		}finally {
			setLoading(false)
		}
	}

	return (
		<ManagementTemplate loading={loading} title='Cadastro de Técnico'>
			<Toast ref={toastRef}/>
			<form onSubmit={handleSubmit(cadastrar)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue=''
						control={control}
						rules={validation.nameValidation}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Nome' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						defaultValue=''
						name='sobrenome'
						control={control}
						rules={validation.lastnameValidation}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Sobrenome' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Controller
					name='email'
					control={control}
					defaultValue=''
					rules={validation.emailValidation}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Email' error={errors[name]}>
						<InputText
							name={name}
							value={value}
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.target.value)}/>
					</InputContainer>
				)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='cpf'
						defaultValue=''
						control={control}
						rules={validation.cpfValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='CPF' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}/>
						<Controller
							name='phone'
							control={control}
							defaultValue=''
							rules={validation.phoneValidation}
							render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Telefone' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}/>
				</InputWrapper>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						defaultValue=''
						control={control}
						name='numero_registro'
						rules={validation.registerValidation}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Número do Conselho' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='id_grupo'
						defaultValue=''
						control={control}
						rules={validation.selectGroupValidation}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Grupo de Usuário' error={errors[name]}>
							<Dropdown
								name={name}
								value={value}
								options={groupOptions}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Controller
					name='senha'
					defaultValue=''
					control={control}
					rules={validation.passwordValidation}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Senha' error={errors[name]}>
						<Password
							toggleMask
							name={name}
							value={value}
							header={passwordHeader}
							footer={passwordFooter}
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.target.value)}/>
					</InputContainer>
				)}/>
				<Controller
					defaultValue=''
					control={control}
					name='passwordConfirm'
					rules={validation.passwordConfirmValidation}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Confirmação de Senha' error={errors[name]}>
						<Password
							toggleMask
							name={name}
							value={value}
							feedback={false}
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.target.value)}/>
					</InputContainer>
				)}/>
				<Button label='Cadastrar'/>
			</form>
		</ManagementTemplate>
	)
}

export default Cadastro