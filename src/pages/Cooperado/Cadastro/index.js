import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'

const Cadastro = () => {
	function cadastrar(form) {
		// eslint-disable-next-line no-console
		console.log('cadastro não implementado', form)
	}

	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid'>
					<CardHeader title='Cadastro de Técnico'/>
					<UnForm onSubmit={cadastrar}>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='name' label='Nome' required/>
							<UnInput name='lastname' label='Sobrenome'/>
						</InputWrapper>
						<UnInput name='email' label='Email'/>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='cpf' label='CPF' required/>
							<UnInput name='phone' label='Telefone' required/>
							<UnInput name='register' label='# do Registro' required/>
							<UnInput name='group' label='Grupo de Usuário' required/>
						</InputWrapper>
						<UnInput type='password' name='password' label='Senha' requires/>
						<UnInput type='password' name='passwordConfirm' label='Confirmação de Senha' required/>
						<Button type='submit' label='Cadastrar'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default Cadastro