import React from 'react'
import { UnInput } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button, Toast} from '~/primereact'
import { getToastInstance } from '~/services'
import { AdminTemplate } from '~/template'

function Perfil() {
	const toastRef = React.useRef(null)
  const [editing, setEditing] = React.useState(false)
	const formRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const submitForm = () => {
		formRef.current.submitForm()
	}

	const editProfile = form => {
		setEditing(false)
		toast.showSuccess('Alterações Realizadas')
	}

	return (
		<AdminTemplate title='Perfil'>
			<Toast ref={toastRef}/>
			<UnForm ref={formRef} onSubmit={editProfile}>
				<InputWrapper columns={2} gap='10px'>
					<UnInput disabled={!editing} name='name' label='Nome'/>
					<UnInput disabled={!editing} name='lastname' label='Sobrenome'/>
				</InputWrapper>
				<UnInput disabled={!editing} name='email' label='Email' />
				<InputWrapper columns={2} gap='10px'>
					<UnInput disabled={!editing} mask='(99) 9 9999-9999' name='phone' label='Telefone'/>
					<UnInput disabled={!editing} mask='999.999.999-99' name='cpf' label='CPF'/>
				</InputWrapper>
				<InputWrapper columns={3} gap='10px'>
					<Button type='submit' label='Desativar Perfil'/>
					<Button type='submit' label='Alterar Senha'/>
					{!editing
						?<Button type='button' onClick={() => setEditing(true)} label='Editar Perfil'/>
						:<Button type='button' onClick={submitForm} label='Salvar'/>}
				</InputWrapper>        
			</UnForm>
		</AdminTemplate>
	)
}

export default Perfil