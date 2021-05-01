import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, UnForm } from '~/common/styles'
import { Button } from '~/primereact'
import styled from 'styled-components'

const Alert = styled('div')`
	font-size: .75rem;
	margin-bottom: 15px;
`

function RecuperarSenha() {
	const request = form => {
		// eslint-disable-next-line no-console
		console.log(form)
	}

	return (
		<Container>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='450px'>
					<CardHeader title='Recuperar Senha'/>
					<Alert>Para redefinir sua senha, informe o seu email, se ele estiver cadastrado em nosso sistema, iremos enviar uma mensagem com mais informações.</Alert>
					<UnForm onSubmit={request}>
						<UnInput name='email' label='E-mail cadastrado' required={true}/>
						<Button type='submit' label='Recuperar Senha'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default RecuperarSenha