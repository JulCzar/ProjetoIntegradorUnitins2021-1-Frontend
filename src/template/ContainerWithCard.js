
import PropTypes from 'prop-types'
import React from 'react'
import { Card, Container, Content } from '~/common/styles'

function ContainerWithCard({
	children,
	contentClassName = '',
	contentStyle = {},
	cardClassName ='',
	cardStyle = {},
	cardWidth
}) {
	return (
		<Container className='p-d-flex'>
			<Content className={`p-d-flex p-jc-center p-ai-center ${contentClassName}`} style={contentStyle}>
				<Card className={cardClassName} width={cardWidth} style={cardStyle}>
					{children}
				</Card>
			</Content>
		</Container>
	)
}

ContainerWithCard.propTypes = {
	children: PropTypes.any,
	contentClassName: PropTypes.string,
	cardClassName: PropTypes.string,
	contentStyle: PropTypes.any,
	cardStyle: PropTypes.any,
	cardWidth: PropTypes.string
}

export default ContainerWithCard