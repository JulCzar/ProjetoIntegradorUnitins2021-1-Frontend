import React from 'react'
import styled from 'styled-components'

const HelloWorld = styled('div')`
	background: #03042e;
	color: #fff;
	display: flex;
	font-family: var(--title_font);
	font-weight: 700;
	font-size: 1.25rem;
	height: 100vh;
	justify-content: center;
	text-align: center;
	align-items: center;
`

const App = function _App() {
  return (
    <HelloWorld>Seja bem vindo ao início do projeto</HelloWorld>
  )
}

export default App
