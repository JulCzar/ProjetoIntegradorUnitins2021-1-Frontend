import React from 'react'
import { useHistory } from 'react-router'
import { CardHeader, UnChecklist, UnInput } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'

import { groupOptions } from '../groupOptions'

function CriarGrupo() {
	const formRef = React.useRef(null)
	const history = useHistory()
	
	const request = form => {
		// eslint-disable-next-line no-console
		console.log(form)
	}

    return (
		<Container className='p-d-flex'>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Criar Grupo'/>
				</Card>
			</Content>
		</Container>
	)
}

export default CriarGrupo