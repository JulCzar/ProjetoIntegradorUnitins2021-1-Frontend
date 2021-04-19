import React from 'react'

import { Button } from '~/primereact'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, UnForm } from '~/common/styles'
import { Link } from 'react-router-dom'

const Login = () => {
	function login(form) {
		// eslint-disable-next-line no-console
		console.log('login não implementado!', form)
	}

	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width={400}>
					<CardHeader title='Login'/>
					<UnForm onSubmit={login}>
						<UnInput name='email' label='Email' required/>
						<UnInput type='password' name='password' label='Senha' required/>
						<p>Não possui conta? <Link to='/cadastrar'>Cadastrar-se</Link></p>
						<Link to='#'>Esqueceu sua senha?</Link>
						<Button className='p-mt-3' type='submit' label='Logar'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default Login