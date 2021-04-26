import React from 'react'
import { CardHeader, UnInput, UnInputDateTime, UnSelect } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button, Toast } from '~/primereact'

	const groupOptions = [
		{value: 1, label: 'teste1'},
		{value: 2, label: 'teste2'},
		{value: 3, label: 'teste3'},
		{value: 4, label: 'teste4'},
		{value: 5, label: 'teste5'},
		{value: 6, label: 'teste6'},
	] 

function DetalhesVisita() {
	const [editing, setEditing] = React.useState(true)

	const toast = React.useRef(null)
	const cooperado = 'Miguel Teixeira'
	const terreno = 'Recanto'

	const agendar = form => {
		const {cooperado, propriedade, motivo} = form
		if ([propriedade, motivo, cooperado].includes(null)) toast.current.show({
			severity: 'warn',
			summary: 'Ainda há campos para serem selecionados'
		}) 
		// eslint-disable-next-line no-console
		console.log(form)
	}

	return (
		<Container >
			<Toast ref={toast} />
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Detalhes da Visita'/>
					<UnForm onSubmit={agendar}>
						<UnInput disabled name='cooperado' label='Cooperado' value={cooperado}/>
						<UnInput disabled name='propriedade' label='Propriedade'  value={terreno}/>
						<InputWrapper columns={2} gap='10px'>
							<UnInputDateTime disabled={editing} name='data' label='Data' dateFormat='dd/mm/yy' mask='99/99/9999' showIcon required/>
							<UnInputDateTime disabled={editing} timeOnly  name='horaEstimada' label='Hora Estimada' mask='99:99'/>
						</InputWrapper>
						<UnSelect disabled={editing} name='motivo' label='Motivo da Visita' options={groupOptions}/>
					</UnForm>
					<InputWrapper columns={3} gap='10px'>
						<Button label='Cancelar Visita'/>
						{editing
							?<Button onClick={() => setEditing(false)} label='Editar Visita'/>
							:<Button onClick={() => setEditing(true)} label='Salvar'/>}
						<Button label='Concluir Visita'/>
					</InputWrapper>
				</Card>
			</Content>
		</Container>
	)
}

export default DetalhesVisita