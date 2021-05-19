import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { cpfValidation, emailValidation, lastnameValidation, nameValidation, phoneValidation } from '~/config/validations'
import { Button, InputMask, InputText, Toast} from '~/primereact'
import { getToastInstance } from '~/services'
import { ManagementTemplate } from '~/template'
import { getInvalidClass } from '~/utils'

function Perfil() {
	const { control, errors, handleSubmit, reset } = useForm()

  const [editing, setEditing] = React.useState(false)
	const formRef = React.useRef(null)

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)
	
	const cancel = () => {
		setEditing(false)
		reset()
	}

	const editProfile = form => {
		console.log(form) // eslint-disable-line

		toast.showSuccess('Alterações Realizadas')
		setEditing(false)
		reset()
	}

	return (
		<ManagementTemplate title='Perfil'>
			<Toast ref={toastRef}/>
			<form ref={formRef} onSubmit={handleSubmit(editProfile)}>
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
									value={value}
									disabled={!editing}
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
						rules={lastnameValidation}
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
					defaultValue=''
					control={control}
					rules={emailValidation}
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
						defaultValue=''
						control={control}
						rules={phoneValidation}
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
							defaultValue=''
							control={control}
							rules={cpfValidation}
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
				<InputWrapper columns={editing?2:3} gap='10px'>
					{!editing && <Button type='button' label='Desativar Perfil'/>}
					{!editing && <Button type='button' label='Alterar Senha'/>}
					{!editing && <Button type='button' onClick={() => setEditing(true)} label='Editar Perfil'/>}
					{editing && <Button type='button' onClick={cancel} label='Cancelar'/>}
					{editing && <Button label='Salvar'/>}
				</InputWrapper>        
			</form>
		</ManagementTemplate>
	)
}

export default Perfil