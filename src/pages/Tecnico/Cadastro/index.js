import React from 'react'
import { CardHeader, UnInput, UnSelect } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button, Toast } from '~/primereact'
import { verifyPassword } from '~/utils'

const Cadastro = () => {
	const toast = React.useRef(null)
	const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	])

	function cadastrar(form) {
		const { passwordConfirm, ...data } = form
		const passwordCheck = verifyPassword(data.password, passwordConfirm)
		
		if (!passwordCheck.isValid) {
			toast.current.show(passwordCheck.errors.map(error => ({
				severity: 'info',
				summary: error
			})))

			return
		}
		// eslint-disable-next-line no-console
		toast.current.show({
			severity: 'success',
			summary: 'Cadastro realizado com sucesso!'
		})
	}

	return (
		<Container >
			<Toast ref={toast} />
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
							<UnInput name='cpf' mask='999.999.999-99' label='CPF' required/>
							<UnInput name='phone' mask='(99) 9 9999-9999' label='Telefone' required/>
						</InputWrapper>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='register' label='# do Registro' required/>
							<UnSelect name='group' label='Grupo de Usuário' options={groupOptions} required/>
						</InputWrapper>
						<UnInput type='password' name='password' label='Senha' required/>
						<UnInput type='password' name='passwordConfirm' label='Confirmação de Senha' required/>
						<Button type='submit' label='Cadastrar'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default Cadastro