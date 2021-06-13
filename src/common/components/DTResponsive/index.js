import React from 'react'
import { element } from 'prop-types'
import styled from 'styled-components'

const Container = styled('div')``
const Landscape = styled('div')`
	@media (max-width: 600px) {
		@media (orientation: portrait) {
			display:none;
		}
	}
`
const Portrait = styled('div')`
	@media (min-width: 599px) {
		display: none;
	}
	@media (max-width: 600px) {
		@media (orientation: Landscape) {
			display: none;
		}
	}
`

function DTResponsive({ children }) {
	return (
		<Container>
			<Portrait>
				Para melhor visualização do conteúdo, vire seu celular, caso esteja no computador, diminua o zoom da janela
			</Portrait>
			<Landscape>
				{children}
			</Landscape>
		</Container>
	)
}

DTResponsive.propTypes = {
	children: element
}

export default DTResponsive