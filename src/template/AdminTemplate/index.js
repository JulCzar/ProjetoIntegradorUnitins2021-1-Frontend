import React from 'react'
import PropTypes from 'prop-types'

import { ContainerWithTemplate } from '~/template'
import { ListBox, PanelMenu } from '~/primereact'

import { lateralMenuItems } from './lateralMenuItems'
import { Block} from '~/common/styles'
import { useHistory } from 'react-router'
import { FullWidth, PanelMenuContainer } from './styles'
import { CardHeader } from '~/common/components'

function AdminTemplate({
	children,
	contentClassName = '',
	contentStyle = {},
	contentContainerClassName ='',
	contentContainerStyle = {},
	title,
	loading
}) {
	const history = useHistory()
	
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
							model={lateralMenuItems.map(getNavigableMenu)}
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

AdminTemplate.propTypes = {
	children: PropTypes.any,
	contentClassName: PropTypes.string,
	contentContainerClassName: PropTypes.string,
	contentStyle: PropTypes.any,
	contentContainerStyle: PropTypes.any,
	loading: PropTypes.bool,
	title: PropTypes.string
}

export default AdminTemplate