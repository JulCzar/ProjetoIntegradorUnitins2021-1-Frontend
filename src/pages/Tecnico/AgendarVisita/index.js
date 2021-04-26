import React from 'react'
import { CardHeader, UnInputDateTime, UnSelect } from '~/common/components'
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

function AgendarVisita() {
	const toast = React.useRef(null)

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
					<CardHeader title='Agendar Visita'/>
					<UnForm onSubmit={agendar}>
						<UnSelect name='cooperado' label='Cooperado' options={groupOptions}/>
						<UnSelect name='propriedade' label='Propriedade' options={groupOptions}/>
						<InputWrapper columns={2} gap='10px'>
							<UnInputDateTime name='data' label='Data' dateFormat='dd/mm/yy' mask='99/99/9999' showIcon required/>
							<UnInputDateTime timeOnly  name='horaEstimada' label='Hora Estimada' mask='99:99'/>
						</InputWrapper>
						<UnSelect name='motivo' label='Motivo da Visita' options={groupOptions}/>
						<Button label='Agendar Visita'/>
					</UnForm>
				</Card>
			</Content>
		</Container>
	)
}

export default AgendarVisita