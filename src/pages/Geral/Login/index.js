import React from 'react'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, useHistory } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import { CardHeader, InputContainer, passwordFooter, passwordHeader } from '~/common/components'
import * as validate from '~/config/validations'
import { Button, InputText, Password, Toast } from '~/primereact'
import { ContainerWithCard } from '~/pages/templates'
import * as action from '~/store/actions/auth'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import { api, getToastInstance } from '~/services'

const Login = ({ loginSuccess, token }) => {
	const { control, errors, handleSubmit, reset } = useForm()
	const [loading, setLoading] = React.useState(false)
	const history = useHistory()

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef) // eslint-disable-line

	React.useEffect(() => {
		if (!token) return

		history.push('/')
	}, [])

	async function logar(form) {
		setLoading(true)
		reset()
		try {
			const { data } = await api.post('/auth/login', form)

			loginSuccess(data)

			history.push('/')
		} catch ({ response }) {
			setLoading(false)

			toast.showError(getApiResponseErrors(response))
		}
	}

	return (
		<ContainerWithCard loading={loading} cardClassName='p-fluid' cardWidth='380px'>
			<Toast ref={toastRef}/>
			<CardHeader title='Login'/>
			<form onSubmit={handleSubmit(logar)}>
				<Controller
					name='email'
					defaultValue=''
					control={control}
					rules={validate.email}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Email' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<Controller
					name='password'
					defaultValue=''
					control={control}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Senha' error={errors[name]}>
							<Password
								toggleMask
								name={name}
								value={value}
								feedback={false}
								header={passwordHeader}
								footer={passwordFooter}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<Link to='/senha/recuperar'>Esqueceu sua senha?</Link>
				<Button className='p-mt-3' type='submit' label='Logar'/>
			</form>
		</ContainerWithCard>
	)
}

Login.propTypes = {
	loginSuccess: PropType.func,
	token: PropType.oneOfType([
		PropType.bool,
		PropType.string
	])
}

export default connect(
	props => props.auth,
	dispatch => bindActionCreators(action, dispatch)
)(Login)