import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
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
					<Controller name='nome'
						defaultValue=''
						control={control}
						rules={{required: 'O campo não pode ficar vazio'}}
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
					<Controller name='sobrenome'
						defaultValue=''
						control={control}
						rules={{required: 'O campo não pode ficar vazio'}}
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
					rules={{required: 'O campo não pode ficar vazio'}}
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
					<Controller name='phone'
						defaultValue=''
						control={control}
						rules={{required: 'O campo não pode ficar vazio'}}
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
						<Controller name='cpf'
							defaultValue=''
							control={control}
							rules={{required: 'O campo não pode ficar vazio'}}
							render={({ name, value, onChange }) => (
								<InputContainer name={name} label='Telefone' error={errors[name]}>
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
				<InputWrapper columns={3} gap='10px'>
					<Button type='submit' label='Desativar Perfil'/>
					<Button type='submit' label='Alterar Senha'/>
					{!editing && (
						<Button type='button' onClick={e => {
							e.stopPropagation()
							setEditing(true)
						}} label='Editar Perfil'/>
					)}
					{editing && (
						<Button type='submit' label='Salvar'/>
					)}
				</InputWrapper>        
			</form>
		</ManagementTemplate>
	)
}

export default Perfil