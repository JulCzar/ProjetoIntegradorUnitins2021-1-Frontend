import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'

function Cadastro() {
	const register = form => {
		// eslint-disable-next-line no-console
		console.log(form)
	}
	return (
		<Container>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='600px'>
					<CardHeader title='Cadastrar Administrador'/>
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
						<InputWrapper columns={2} gap='10px'>
							<UnInput type='password' name='password' label='Senha'/>
							<UnInput type='password' name='passwordConfirm' label='Confirmação de Senha'/>
						</InputWrapper>
						<Button type='submit' label='Cadastrar'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default Cadastro