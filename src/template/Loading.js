import React from 'react'
import styled from 'styled-components'

const Container = styled('div')`
	align-items: center;
	background: #0008;
	display: flex;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 9999;
`

function Loading() {
	return (
		<Container>
			<i className="fas fa-circle-notch fa-spin fa-7x"></i>
		</Container>
	)
}

export default Loading