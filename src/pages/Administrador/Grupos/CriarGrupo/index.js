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
		<Container>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Criar Grupo'/>
					<UnForm ref={formRef} onSubmit={request}>
						<UnInput name='nome' label='Nome' required/>
						<UnChecklist name='roles' label='Permissões' options={groupOptions} gap='20px' columns={2} isMulti/>
						<InputWrapper columns={2} gap='10px'>
							<Button onClick={() => history.goBack()} type='cancelar' label='Cancelar'/>
							<Button type='criar' label='Criar'/>
						</InputWrapper>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default CriarGrupo