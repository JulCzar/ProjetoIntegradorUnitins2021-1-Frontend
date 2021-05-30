import { useHistory, useLocation } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'

import { Container, Header, Content, Footer, ContainerLimiter, HeaderMenu } from '../styles'
import { Button, ListBox, OverlayPanel, TabMenu, Toast } from '~/primereact'
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
	const toastRef = React.useRef(null)
	const op = React.useRef(null)
	const location = useLocation()
	const history = useHistory()
	
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		const messages = location?.state?.messages
		if (messages) toast.showMultiple(messages)
	}, [location.state])
	
	
	React.useEffect(() => {
		updateMenuItems()
		store.subscribe(updateMenuItems)
	}, [])

	function updateMenuItems() {
		const { auth } = store.getState()
		
		const items = getMenuItems(auth)

		setMenuItems(items)
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
						<TabMenu className='desktop' model={menuItems} activeIndex={-1} onTabChange={handleTabChange}/>
						<Button className='mobile' type="button" icon='fas fa-bars' onClick={e => op.current.toggle(e)} />

						<OverlayPanel ref={op} className='mobile'>
							<ListBox options={menuItems} onChange={handleTabChange} />
						</OverlayPanel>
					</HeaderMenu>
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