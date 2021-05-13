import React from 'react'

import { InputWrapper, UnForm } from '~/common/styles'
import { CardHeader, UnInput, UnSelect } from '~/common/components'
import { api, getToastInstance } from '~/services'
import { Button, Toast } from '~/primereact'
import { verifyPassword, getPhoneObject } from '~/utils'
import { ContainerWithCard } from '~/template'

const Cadastro = () => {
	const toastRef = React.useRef(null)
	const formRef = React.useRef(null)
	const [loading, setLoading] = React.useState(false)
	const [groupOptions] = React.useState([{label: 'Cooperado', value: 1}])

	const toast = getToastInstance(toastRef)

	async function cadastrar(form) {
		setLoading(true)
		const { passwordConfirm, phone, id_grupo, ...data } = form
		const passwordCheck = verifyPassword(data.senha, passwordConfirm)
		const telefone = getPhoneObject(phone)
		
		if (!passwordCheck.isValid) return toast.showInfos(passwordCheck.errors)
		if (!telefone) return toast.showError('O número de telefone providenciado é inválido')
		
		try {
			await api.post('/tecnico/store', {...data, telefone})

			toast.showSuccess('Cadastro Realizado com Sucesso!')

			formRef.current.reset()
		}catch ({ response }) {
			toast.showInfo(response.data.message)
		}finally {
			setLoading(false)
		}
	}

	return (
		<ContainerWithCard loading={loading} cardClassName='p-fluid' >
			<Toast ref={toastRef}/>
			<CardHeader title='Cadastro de Técnico'/>
				<UnForm ref={formRef} onSubmit={cadastrar}>
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='nome' label='Nome' required/>
						<UnInput name='sobrenome' label='Sobrenome' required/>
					</InputWrapper>
					<UnInput name='email' label='Email' required/>
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='cpf' mask='999.999.999-99' label='CPF' required/>
						<UnInput name='phone' mask='(99) 9 9999-9999' label='Telefone' required/>
					</InputWrapper>
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='numero_registro' label='Número do Conselho' required/>
						<UnSelect name='id_grupo' label='Grupo de Usuário' options={groupOptions} required/>
					</InputWrapper>
					<UnInput type='password' name='senha' label='Senha' required toggleMask/>
					<UnInput type='password' name='passwordConfirm' label='Confirmação de Senha' required toggleMask feedback={false}/>
					<Button type='submit' label='Cadastrar'/>
				</UnForm>
		</ContainerWithCard>
	)
}

export default Cadastro