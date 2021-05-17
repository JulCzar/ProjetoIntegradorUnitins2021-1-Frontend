import React from 'react'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Controller, useForm } from 'react-hook-form'

import { CardHeader, InputContainer } from '~/common/components'
import { Button, InputText, Password } from '~/primereact'
import { ContainerWithCard } from '~/template'
import * as action from '~/store/actions/auth'
import { getInvalidClass } from '~/utils'

const Login = ({ login }) => {
	const { control, errors, handleSubmit, reset } = useForm()

	async function logar(form) {
		console.log(form) // eslint-disable-line
		await login(form)

		reset()
	}

	return (
		<ContainerWithCard cardClassName='p-fluid' cardWidth='380px'>
			<CardHeader title='Login'/>
			<form onSubmit={handleSubmit(logar)}>
				<Controller
					name='email'
					defaultValue=''
					control={control}
					rules={{required: 'O campo email não pode ficar vazio'}}
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
					name='senha'
					defaultValue=''
					control={control}
					rules={{required: 'O campo email não pode ficar vazio'}}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Senha' error={errors[name]}>
							<Password
								toggleMask
								name={name}
								value={value}
								feedback={false}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<Link to='/recuperar-senha'>Esqueceu sua senha?</Link>
				<Button className='p-mt-3' type='submit' label='Logar'/>
			</form>
		</ContainerWithCard>
	)
}

Login.propTypes = {
	login: PropType.func
}

export default connect(
	props => props.auth,
	dispatch => bindActionCreators(action, dispatch)
)(Login)