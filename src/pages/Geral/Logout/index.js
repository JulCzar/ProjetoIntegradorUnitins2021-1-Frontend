import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import * as action from '~/store/actions/auth'
import ContainerTemplate from '~/pages/templates/ContainerTemplate'
import { ProgressSpinner } from '~/primereact'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'

const Container = styled('div')`
	height: 70vh;
	font-size: 2rem;
	text-align: center;
`

function Logout({ logout }) {
	const history = useHistory()
	React.useEffect(() => {
		async function _logout() {
			await logout()

			history.push('/')
		}

		_logout()
	}, [])

	return (
		<ContainerTemplate contentClassName='p-d-flex p-ai-center p-jc-center'>
			<Container className='p-mt-5 p-d-flex p-ai-center'>
				Deslogando <ProgressSpinner/>
			</Container>
		</ContainerTemplate>
	)
}

Logout.propTypes = {
	logout: PropTypes.func
}

export default connect(
	props => props.auth,
	dispatch => bindActionCreators(action, dispatch)
)(Logout)