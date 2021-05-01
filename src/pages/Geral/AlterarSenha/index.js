import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, UnForm } from '~/common/styles'
import { Button, Toast } from '~/primereact'
import styled from 'styled-components'
import { verifyPassword } from '~/utils'

const Alert = styled('div')`
	font-size: .75rem;
	margin-bottom: 15px;
`

function AlterarSenha() {
	const toast = React.useRef(null)

	const request = form => {
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
			summary: 'Sua Senha foi redefinida com sucesso!'
		})
	}

	return (
		<Container>
			<Toast ref={toast} />
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='450px'>
					<CardHeader title='Alterar Senha'/>
					<Alert>Informe uma senha e confirme para que possamos realizar as devidas alterações em nosso sistema.</Alert>
					<UnForm onSubmit={request}>
						<UnInput name='password' label='Nova senha' required={true}/>
						<UnInput name='passwordConfirm' label='Confirme a nova senha' required={true}/>
						<Button type='submit' label='Recuperar Senha'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default AlterarSenha