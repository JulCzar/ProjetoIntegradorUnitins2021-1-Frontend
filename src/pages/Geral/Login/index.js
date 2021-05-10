import React from 'react'
import PropType from 'prop-types'
import * as action from '~/store/actions/auth'
import { Link } from 'react-router-dom'

import { Button } from '~/primereact'
import { CardHeader, UnInput } from '~/common/components'
import { UnForm } from '~/common/styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ContainerWithCard } from '~/template'

const Login = ({ login }) => {
	async function logar(form) {
		await login(form)
	}

	return (
		<ContainerWithCard cardClassName='p-fluid' cardWidth='380px'>
			<CardHeader title='Login'/>
			<UnForm onSubmit={logar}>
				<UnInput name='email' label='Email' required/>
				<UnInput type='password' name='password' label='Senha' required/>
				<p>Não possui conta? <Link to='/cadastrar/tecnico'>Cadastrar-se</Link></p>
				<Link to='/recuperar-senha'>Esqueceu sua senha?</Link>
				<Button className='p-mt-3' type='submit' label='Logar'/>
			</UnForm>
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