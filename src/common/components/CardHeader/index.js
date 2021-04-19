import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled('h3')`
	border-bottom: .25px solid var(--text-color);
	font-size: 1.7rem;
	font-weight: 300;
	margin-bottom: 1.25rem;
	width: 100%;
`

const CardHeader = ({title}) => <Title>{title}</Title>

CardHeader.propTypes = {
	title: PropTypes.string
}

export default CardHeader