import React from 'react'
import { useHistory } from 'react-router'
import { CardHeader, UnChecklist, UnInput } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'
import { groupOptions } from '../groupOptions'

function EditarGrupo() {
	const history = useHistory()

	const request = form => {
		// eslint-disable-next-line no-console
		console.log(form)
	}

	return (
		<Container className='p-d-flex'>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Editar Grupo'/>
					<UnForm onSubmit={request}>
						<UnInput name='nome' label='Nome' required={true}/>
						<UnChecklist name='roles' label='Permissões' options={groupOptions} gap='20px' columns={2} isMulti/>
					</UnForm>
					<InputWrapper columns={3} gap='10px'>
						<Button onClick={() => {history.goBack()}} label='Cancelar'/>
						<Button label='Excluir'/>
						<Button label='Salvar'/>
					</InputWrapper>
				</Card>
			</Content>
		</Container>
	)
}

export default EditarGrupo
