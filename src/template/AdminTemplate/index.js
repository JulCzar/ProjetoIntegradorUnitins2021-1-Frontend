import React from 'react'
import PropTypes from 'prop-types'

import { ContainerWithTemplate } from '~/template'
import { ListBox } from '~/primereact'

import { lateralMenuItems } from './lateralMenuItems'
import { Block, Content } from '~/common/styles'
import { useHistory } from 'react-router'
import { ContainerLimiter } from '../styles'
import { FullWidth } from './styles'
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
					<ListBox className='p-col-4 p-md-3' options={lateralMenuItems} onChange={handleTabChange}/>
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