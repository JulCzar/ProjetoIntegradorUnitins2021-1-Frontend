import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { InputWrapper, UnForm } from '~/common/styles'
import { InputContainer, UnInput, UnSelect } from '~/common/components'
import {  api, getToastInstance } from '~/services'
import { Button, Dropdown, InputMask, InputText, Password, Toast } from '~/primereact'
import { verifyPassword, getPhoneObject, classNames } from '~/utils'
import { ManagementTemplate } from '~/template'

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
			toast.showInfo(response.data.message)
		}finally {
			setLoading(false)
		}
	}

	const getClass = name => classNames({ 'p-invalid': errors[name]})

	return (
		<ManagementTemplate loading={loading} title='Cadastro de Técnico'>
			<Toast ref={toastRef}/>
			<form ref={formRef} onSubmit={handleSubmit(cadastrar)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						control={control}
						defaultValue=''
						rules={{required: 'Informe o nome'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Nome' error={errors[name]}>
							<InputText
								name={name}
								className={getClass(name)}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='sobrenome'
						control={control}
						defaultValue=''
						rules={{required: 'Informe o sobrenome'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Sobrenome' error={errors[name]}>
							<InputText
								name={name}
								className={getClass(name)}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
					<Controller
						name='email'
						control={control}
						defaultValue=''
						rules={{required: 'Informe o email'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Email' error={errors[name]}>
							<InputText
								name={name}
								className={getClass(name)}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='cpf'
						control={control}
						defaultValue=''
						rules={{required: 'Informe o CPF'}}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='CPF' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									mask='999.999.999-99'
									className={getClass(name)}
									onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}/>
						<Controller
							name='phone'
							control={control}
							defaultValue=''
							rules={{required: 'Informe o Telefone'}}
							render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Telefone' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									mask='(99) 9 9999-9999'
									className={getClass(name)}
									onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}/>
				</InputWrapper>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='numero_registro'
						control={control}
						defaultValue=''
						rules={{required: 'Informe o registro'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Número do Conselho' error={errors[name]}>
							<InputText
								name={name}
								className={getClass(name)}
								value={value}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='id_grupo'
						control={control}
						defaultValue=''
						rules={{required: 'Selecione o grupo'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Grupo de Usuário' error={errors[name]}>
							<Dropdown
								name={name}
								value={value}
								options={groupOptions}
								className={getClass(name)}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
					<Controller
						name='senha'
						control={control}
						defaultValue=''
						rules={{required: 'Insira uma senha'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Senha' error={errors[name]}>
							<Password
								toggleMask
								name={name}
								value={value}
								className={getClass(name)}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='passwordConfirm'
						control={control}
						defaultValue=''
						rules={{required: 'Confirme sua senha'}}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Confirmação de Senha' error={errors[name]}>
							<Password
								toggleMask
								name={name}
								value={value}
								feedback={false}
								className={getClass(name)}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				<Button label='Cadastrar'/>
			</form>
		</ManagementTemplate>
	)
}

export default Cadastro