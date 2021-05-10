import React from 'react'
import styled from 'styled-components'
import { ProgressSpinner } from '~/primereact'

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
			<ProgressSpinner/>
		</Container>
	)
}

export default Loading