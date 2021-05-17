import React from 'react'
import { CardHeader, InputContainer } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Button, Password, Toast } from '~/primereact'
import styled from 'styled-components'
import { getInvalidClass, verifyPassword } from '~/utils'
import { Controller, useForm } from 'react-hook-form'
import { getToastInstance } from '~/services'

const Alert = styled('div')`
	font-size: .75rem;
	margin-bottom: 15px;
`

function AlterarSenha() {
	const { errors, control, handleSubmit, reset } = useForm()

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const request = form => {
		const { senha, passwordConfirm } = form
		const passwordCheck = verifyPassword(senha, passwordConfirm)
		
		if (!passwordCheck.isValid) return toast.showInfos(passwordCheck.errors)
		
		// eslint-disable-next-line no-console
		toast.showSuccess('Sua Senha foi redefinida com sucesso!')
		reset()
	}

	return (
		<Container className='p-d-flex'>
			<Toast ref={toastRef} />
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='450px'>
					<CardHeader title='Alterar Senha'/>
					<Alert>Informe uma senha e confirme para que possamos realizar as devidas alterações em nosso sistema.</Alert>
					<form onSubmit={handleSubmit(request)}>
						<Controller
							name='senha'
							defaultValue=''
							control={control}
							rules={{required: 'É necessário informar uma senha'}}
							render={({ name, value, onChange }) => (
							<InputContainer label='Nova senha' name={name} error={errors[name]}>
								<Password
									toggleMask
									name={name}
									value={value}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}/>
						<Controller
							name='passwordConfirm'
							defaultValue=''
							control={control}
							rules={{required: 'Confirme sua senha'}}
							render={({ name, value, onChange }) => (
							<InputContainer label='Confirme a senha' name={name} error={errors[name]}>
								<Password
									toggleMask
									name={name}
									value={value}
									feedback={false}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}/>
						<Button type='submit' label='Recuperar Senha'/>
					</form>
				</Card>
			</Content>
		</Container>
	)
}

export default AlterarSenha