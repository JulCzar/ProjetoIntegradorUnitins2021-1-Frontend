import React from 'react'
import { CardHeader, InputContainer } from '~/common/components'
import { Button, InputText, Toast } from '~/primereact'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import * as validate from '~/config/validations'
import { api, getToastInstance } from '~/services'
import { ContainerWithCard } from '~/pages/templates'

const Alert = styled('div')`
	font-size: .75rem;
	margin-bottom: 15px;
`

function RecuperarSenha() {
	const { control, errors, handleSubmit, reset } = useForm()

	const [loading, setLoading] = React.useState(false)
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	async function request (form) {
		try {
			setLoading(true)

			await api.post('/recuperar', form)

			toast.showSuccess('Enviamos um email com instruções para recuperar sua senha')
			toast.showInfo('Redirecionando para a página inicial.')
			setTimeout(() => history.push('/'), 2000)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}

		reset()
	}

	return (
		<ContainerWithCard contentClassName='p-fluid p-p-2' cardStyle={{maxWidth: '450px'}} loading={loading}>
			<Toast ref={toastRef}/>
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
		</ContainerWithCard>
	)
}

export default RecuperarSenha