import React from 'react'
import { useHistory } from 'react-router'
import { CardHeader, UnChecklist, UnInput } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'

function EditarGrupos() {
	const history= useHistory()
	const groupOptions = [
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	  ]
	const request = form => {
		// eslint-disable-next-line no-console
		console.log(form)
	}

    return (
		<Container>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Editar Grupo'/>
					<UnForm onSubmit={request}>
						<UnInput name='nome' label='Nome' required={true}/>
						<UnChecklist name='roles' label='Permissões' options={groupOptions} gap='20px' columns={2} isMulti/>
					</UnForm>
					<InputWrapper columns={3} gap='10px'>
						<Button label='Excluir'/>
						<Button label='Salvar'/>
						<Button onClick={() => {history.goBack()}} label='Cancelar'/>
					</InputWrapper>
				</Card>
			</Content>
		</Container>
	)
}

export default EditarGrupos
