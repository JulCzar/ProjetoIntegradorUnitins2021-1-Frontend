import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import { ContainerWithTemplate } from '~/pages/templates'
import { PanelMenu } from '~/primereact'

import { FullWidth, PanelMenuContainer } from './styles'
import { getMenuItems } from './lateralMenuItems'
import { CardHeader } from '~/common/components'
import * as action from '~/store/actions/auth'
import { useHistory } from 'react-router'
import { Block} from '~/common/styles'

function ManagementTemplate({
	contentContainerClassName ='',
	contentContainerStyle = {},
	contentClassName = '',
	contentStyle = {},
	permissions,
	children,
	loading,
	title
}) {
	const [menuItems, setMenuItems] = React.useState([])
	const history = useHistory()

	React.useEffect(() => {
		const items = getMenuItems({permissions})
		setMenuItems(items)
	}, [permissions])
	
	const handleTabChange = e => {
		history.push(e.value.destination)
	}

	const getNavigableMenu = item => {
		const {label, destination, items, ...rest} = item
		let result = { label, ...rest }

		if (destination)
			result.command = () => history.push(destination)
		if (items)
			result.items = items.map(getNavigableMenu)

		return result
	}

	return (
		<ContainerWithTemplate
			contentContainerClassName={contentContainerClassName}
			contentContainerStyle={contentContainerStyle}
			contentClassName={contentClassName}
			contentStyle={contentStyle}
			loading={loading}
		>
			<FullWidth className='p-mt-5'>
				<Block className='p-grid'>
					<PanelMenuContainer className='p-col-4 p-md-3'>
						<PanelMenu
							model={menuItems.map(getNavigableMenu)}
							onChange={handleTabChange}/>
					</PanelMenuContainer>
					<Block className='p-col-8 p-md-9 p-px-5 p-pb-5'>
						<CardHeader title={title} className='p-mb-5'/>
						<Block className='p-fluid'>
							{children}
						</Block>
					</Block>
				</Block>
			</FullWidth>
		</ContainerWithTemplate>
	)
}

ManagementTemplate.propTypes = {
	children: PropTypes.any,
	contentClassName: PropTypes.string,
	contentContainerClassName: PropTypes.string,
	contentStyle: PropTypes.any,
	contentContainerStyle: PropTypes.any,
	permissions: PropTypes.arrayOf(PropTypes.number),
	loading: PropTypes.bool,
	title: PropTypes.string
}


export default connect(
	props => props.auth,
	dispatch => bindActionCreators(action, dispatch)
)(ManagementTemplate)