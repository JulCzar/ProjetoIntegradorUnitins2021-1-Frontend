import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { Button, Dropdown, InputMask, InputText} from '~/primereact'
import { ManagementTemplate } from '~/template'
import { getInvalidClass } from '~/utils'

function Perfil() {
	const { control, errors, handleSubmit, reset } = useForm()
  const [editing, setEditing] = React.useState(false)

	const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabirinhas', value: 5}
	])

	const editarPerfil = form => {
		console.log(form) // eslint-disable-line
		
		setEditing(false)
	}

	return (
		<ManagementTemplate title='Perfil'>
			<form onSubmit={handleSubmit(editarPerfil)}>
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
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
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
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
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
							value={value}
							disabled={!editing}
							className={getInvalidClass(errors[name])}
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
									disabled={!editing}	
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
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
									disabled={!editing}
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
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
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
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
								disabled={!editing}
								options={groupOptions}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<InputWrapper columns={editing?2:3} gap='10px'>
					{!editing && <Button type='button' label='Desativar Perfil'/>}
					{editing && <Button type='button' onClick={() => {setEditing(false);reset()}} label='Cancelar'/>}
					{!editing && <Button type='button' label='Alterar Senha'/>}
					{!editing && <Button type='button' onClick={() => setEditing(true)} label='Editar Perfil'/>}
					{editing && <Button label='Salvar'/>}
				</InputWrapper>
			</form>
		</ManagementTemplate>
	)
}

export default Perfil