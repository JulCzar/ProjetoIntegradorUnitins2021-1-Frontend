import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Content, Title } from '~/common/styles'

const App = function _App() {
  return (
    <Container>
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Title className='p-fluid'>
					Bem vindo ao início do Projeto!<br/>
					<Link to='login'>Logar</Link>
				</Title>
			</Content>
		</Container>
  )
}

export default App
