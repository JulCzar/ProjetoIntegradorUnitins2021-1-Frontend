import { useHistory, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import React from 'react'

import { CardHeader, InputContainer, passwordFooter, passwordHeader } from '~/common/components'
import { getApiResponseErrors, getInvalidClass, verifyPassword } from '~/utils'
import { Button, InputText, Password, Toast } from '~/primereact'
import { Card, Container, Content } from '~/common/styles'
import * as validate from '~/config/validations'
import { getToastInstance } from '~/services'

const Alert = styled('div')`
	font-size: .75rem;
	margin-bottom: 15px;
`

function AlterarSenha() {
	const { errors, control, handleSubmit } = useForm()
	const [loading, setLoading] = React.useState(false)
	const { token } = useParams()
	const history = useHistory()

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	async function request(form) {
		const { email, senha, passwordConfirm } = form
		const passwordCheck = verifyPassword(senha, passwordConfirm)
		
		if (!passwordCheck.isValid) return toast.showInfos(passwordCheck.errors)
		
		try {
			setLoading(true)
			const params = { senha, token, email }
			const config = { params }

			await api.post('/alterar', config)

			toast.showSuccess('Sua senha foi alterada!')
			toast.showInfo('Redirecionando para a tela inicial...')
			setTimeout(() => history.push('/'), 1000)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container className='p-d-flex' loading={loading}>
			<Toast ref={toastRef} />
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='450px'>
					<CardHeader title='Alterar Senha'/>
					<Alert>Informe uma senha e confirme para que possamos realizar as devidas alterações em nosso sistema.</Alert>
					<form onSubmit={handleSubmit(request)}>
					<Controller
							name='email'
							defaultValue=''
							control={control}
							rules={validate.password}
							render={({ name, value, onChange }) => (
							<InputContainer label='Email' name={name} error={errors[name]}>
								<InputText
									name={name}
									value={value}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}/>
						<Controller
							name='senha'
							defaultValue=''
							control={control}
							rules={validate.password}
							render={({ name, value, onChange }) => (
							<InputContainer label='Nova senha' name={name} error={errors[name]}>
								<Password
									toggleMask
									name={name}
									value={value}
									header={passwordHeader}
									footer={passwordFooter}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}/>
						<Controller
							defaultValue=''
							control={control}
							name='passwordConfirm'
							rules={validate.passwordConfirm}
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