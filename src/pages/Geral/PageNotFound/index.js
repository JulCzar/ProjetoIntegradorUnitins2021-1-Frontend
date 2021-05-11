import React from 'react'
import styled from 'styled-components'
import { ContainerWithTemplate } from '~/template'

const Container = styled('div')`
	height: 70vh;
	font-size: 2rem;
	text-align: center;
`

const PageNotFound = function _PageNotFound() {
  return (
    <ContainerWithTemplate contentClassName='p-d-flex p-ai-center p-jc-center'>
			<Container className='p-mt-5 p-d-flex p-ai-center'>
				Página não encontrada
			</Container>
		</ContainerWithTemplate>
  )
}

export default PageNotFound
