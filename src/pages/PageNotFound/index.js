import React from 'react'
import { Container, Content, Title } from '~/common/styles'

const PageNotFound = function _PageNotFound() {
  return (
    <Container>
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Title className='p-fluid'>
					Página não encontrada
				</Title>
			</Content>
		</Container>
  )
}

export default PageNotFound
