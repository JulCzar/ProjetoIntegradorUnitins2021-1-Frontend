import { useHistory, useLocation } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'

import { Container, Header, Content, Footer, ContainerLimiter, HeaderMenu } from '../styles'
import { Avatar, Button, ListBox, OverlayPanel, TabMenu, Toast } from '~/primereact'
import Loading from '~/pages/templates/components/Loading'
import { getToastInstance } from '~/services'
import { getMenuItems } from '../menuItems'
import logo from '~/assets/logo.svg'
import { store } from '~/store'

function ContainerTemplate({
	contentContainerClassName ='',
	contentContainerStyle = {},
	contentClassName = '',
	contentStyle = {},
	children,
	loading,
}) {
	const [menuItems, setMenuItems] = React.useState([])
	const [user, setUser] = React.useState(null)
	const toastRef = React.useRef(null)
	const location = useLocation()
	const profile = React.useRef(null)
	const op = React.useRef(null)
	const history = useHistory()
	
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		const messages = location?.state?.messages
		if (messages) toast.showMultiple(messages)
	}, [location.state])
	
	
	React.useEffect(() => {
		updateMenuItems()
		updateUser()
		store.subscribe(updateMenuItems)
		store.subscribe(updateUser)
	}, [])

	function updateMenuItems() {
		const { auth } = store.getState()
		
		const items = getMenuItems(auth)

		setMenuItems(items)
	}

	function updateUser() {
		const { auth } = store.getState()

		const { user } = auth

		if (Object.entries(user).length) setUser(user)
	}

	const handleTabChange = e => {
		history.push(e.value.destination)
	}

	return (
		<Container>
			<Toast ref={toastRef}/>
			{loading && <Loading/>}
			<Header>
				<ContainerLimiter className='p-d-flex p-mx-auto p-jc-between p-ai-center'>
					<img draggable={false} src={logo} alt='Logo do sistema SIMOV' height='50'/>
						<HeaderMenu>
							<div className="p-d-flex p-jc-between p-ai-center">
							<TabMenu className='desktop' model={menuItems} activeIndex={-1} onTabChange={handleTabChange}/>
							{!!user && <Avatar
								shape='circle'
								className='p-mx-3'
								onClick={e => profile.current.toggle(e)}
								image={`https://ui-avatars.com/api/?name=${user.name}&color=ffffff&background=${user.color}`}
							/>}
							<Button className='mobile' type="button" icon='fas fa-bars' onClick={e => op.current.toggle(e)} />

							<OverlayPanel ref={op} className='mobile'>
								<ListBox options={menuItems} onChange={handleTabChange} />
							</OverlayPanel>
							</div>

						</HeaderMenu>

						<OverlayPanel ref={profile} className='mobile'>
							<ListBox options={[
								{label: 'Perfil', destination: '/perfil'},
								{label: 'Visitas', destination: '/visitas'},
								{label: 'Sair', destination: '/logout'}
							]} onChange={handleTabChange} />
						</OverlayPanel>
				</ContainerLimiter>
			</Header>
			<Content className={contentClassName} style={contentStyle}>
				<ContainerLimiter className={`container p-mb-5 ${contentContainerClassName}`} style={contentContainerStyle}>
					{children}
				</ContainerLimiter>
			</Content>
			<Footer>
				<ContainerLimiter className='p-mx-auto'>
					SIMOV Coapa - Sistemas de Gerenciamento de Visitas Coapa 2021
				</ContainerLimiter>
			</Footer>
		</Container>
	)
}

ContainerTemplate.propTypes = {
	contentContainerClassName: PropTypes.string,
	contentContainerStyle: PropTypes.any,
	contentClassName: PropTypes.string,
	contentStyle: PropTypes.any,
	children: PropTypes.any,
	loading: PropTypes.bool,
}

export default ContainerTemplate