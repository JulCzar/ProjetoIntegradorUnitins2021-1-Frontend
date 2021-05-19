import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { InputWrapper } from '~/common/styles'
import { InputContainer, passwordFooter, passwordHeader } from '~/common/components'
import {  api, getToastInstance } from '~/services'
import { Button, Dropdown, InputMask, InputText, Password, Toast } from '~/primereact'
import { verifyPassword, getPhoneObject, getInvalidClass } from '~/utils'
import { ManagementTemplate } from '~/template'
import { cpfValidation, emailValidation, lastnameValidation, nameValidation, passwordConfirmValidate, passwordValidate, phoneValidation, registerValidate, selectGroupValidate } from '~/config/validations'

const Cadastro = () => {
	const toastRef = React.useRef(null)
	const formRef = React.useRef(null)
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

			formRef.current.reset()

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
			<form ref={formRef} onSubmit={handleSubmit(cadastrar)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue=''
						control={control}
						rules={nameValidation}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Nome' error={errors[name]}>
							<InputText
								name={name}
								className={getInvalidClass(errors[name])}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						defaultValue=''
						name='sobrenome'
						control={control}
						rules={lastnameValidation}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Sobrenome' error={errors[name]}>
							<InputText
								name={name}
								className={getInvalidClass(errors[name])}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Controller
					name='email'
					control={control}
					defaultValue=''
					rules={emailValidation}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Email' error={errors[name]}>
						<InputText
							name={name}
							className={getInvalidClass(errors[name])}
							value={value}
							onChange={evt => onChange(evt.target.value)}/>
					</InputContainer>
				)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='cpf'
						defaultValue=''
						control={control}
						rules={cpfValidation}
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
							rules={phoneValidation}
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
						rules={registerValidate}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Número do Conselho' error={errors[name]}>
							<InputText
								name={name}
								className={getInvalidClass(errors[name])}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='id_grupo'
						defaultValue=''
						control={control}
						rules={selectGroupValidate}
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
					rules={passwordValidate}
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
					rules={passwordConfirmValidate}
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