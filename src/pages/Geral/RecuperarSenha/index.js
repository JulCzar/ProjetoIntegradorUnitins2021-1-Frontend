import React from 'react'
import { CardHeader, InputContainer } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Button, InputText } from '~/primereact'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { getInvalidClass } from '~/utils'
import * as validate from '~/config/validations'

const Alert = styled('div')`
	font-size: .75rem;
	margin-bottom: 15px;
`

function RecuperarSenha() {
	const { control, errors, handleSubmit, reset } = useForm()

	const request = form => {
		console.log(form)	// eslint-disable-line no-console

		reset()
	}

	return (
		<Container className='p-d-flex'>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='450px'>
					<CardHeader title='Recuperar Senha'/>
					<Alert>Para redefinir sua senha, informe o seu email, se ele estiver cadastrado em nosso sistema, iremos enviar uma mensagem com mais informações.</Alert>
					<form onSubmit={handleSubmit(request)}>
						<Controller
							name='email'
							defaultValue=''
							control={control}
							rules={validate.email}
							render={({ name, value, onChange}) => (
								<InputContainer name={name} label='E-mail cadastrado' error={errors[name]}>
									<InputText
										name={name}
										value={value}
										className={getInvalidClass(errors[name])}
										onChange={evt => onChange(evt.target.value)}
									/>
								</InputContainer>
							)}/>
						<Button label='Recuperar Senha'/>
					</form>
				</Card>
			</Content>
		</Container>
	)
}

export default RecuperarSenha