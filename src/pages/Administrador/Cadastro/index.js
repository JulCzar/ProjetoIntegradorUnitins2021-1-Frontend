import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button, Toast } from '~/primereact'
import { getToastInstance } from '~/services'
import { AdminTemplate } from '~/template'
import { verifyPassword } from '~/utils'

function Cadastro() {
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const register = form => {
		const { passwordConfirm, ...data } = form
		const passwordCheck = verifyPassword(data.password, passwordConfirm)
		
		if (!passwordCheck.isValid) return toast.showWarns(passwordCheck.errors)
		// eslint-disable-next-line no-console
		toast.showSuccess('Cadastro realizado com sucesso!')
	}
	return (
		<AdminTemplate title='Cadastrar Administrador'>
			<Toast ref={toastRef}/>
			<UnForm onSubmit={register}>
				<InputWrapper columns={2} gap='10px'>
					<UnInput name='name' label='Nome' required={true}/>
					<UnInput name='lastname' label='Sobrenome'/>
				</InputWrapper>
				<UnInput name='email' label='Email' />
				<InputWrapper columns={2} gap='10px'>
					<UnInput mask='(99) 9 9999-9999' name='phone' label='Telefone'/>
					<UnInput mask='999.999.999-99' name='cpf' label='CPF'/>
				</InputWrapper>
				<UnInput type='password' minLength='8' name='password' label='Senha' required toggleMask/>
				<UnInput type='password' name='passwordConfirm' label='Confirmação de Senha' required toggleMask feedback={false}/>
				<Button type='submit' label='Cadastrar'/>
			</UnForm>
		</AdminTemplate>
	)
}

export default Cadastro