import React from 'react'

import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { CardHeader, UnInput, UnSelect } from '~/common/components'
import { api, getToastInstance } from '~/services'
import { Button, Toast } from '~/primereact'
import { verifyPassword, getPhoneObject } from '~/utils'

const Cadastro = () => {
	const toastRef = React.useRef(null)
	const formRef = React.useRef(null)
	const [groupOptions] = React.useState([{label: 'Cooperado', value: 1}])

	const toast = getToastInstance(toastRef)

	async function cadastrar(form) {
		const { passwordConfirm, phone, ...data } = form
		const passwordCheck = verifyPassword(data.senha, passwordConfirm)
		
		if (!passwordCheck.isValid) return toast.showInfos(passwordCheck.errors)
		
		try {
			const telefone = getPhoneObject(phone)

			if (!telefone) return toast.showError('O número de telefone providenciado é inválido')

			await api.post('/tecnico/store', {...data, telefone})

			toast.showSuccess('Cadastro Realizado com Sucesso!')

			formRef.current.reset()
		}catch ({ response }) {
			toast.showInfo(response.data.message)
		}
	}

	return (
		<Container className='p-d-flex'>
			<Toast ref={toastRef} />
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid'>
					<CardHeader title='Cadastro de Técnico'/>
					<UnForm ref={formRef} onSubmit={cadastrar}>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='nome' label='Nome' required/>
							<UnInput name='lastname' label='Sobrenome'/>
						</InputWrapper>
						<UnInput name='email' label='Email'/>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='cpf' mask='999.999.999-99' label='CPF' required/>
							<UnInput name='phone' mask='(99) 9 9999-9999' label='Telefone' required/>
						</InputWrapper>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='registro' label='# do Registro' required/>
							<UnSelect name='grupo' label='Grupo de Usuário' options={groupOptions} required/>
						</InputWrapper>
						<UnInput type='password' name='senha' label='Senha' required/>
						<UnInput type='password' name='passwordConfirm' label='Confirmação de Senha' required/>
						<Button type='submit' label='Cadastrar'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default Cadastro