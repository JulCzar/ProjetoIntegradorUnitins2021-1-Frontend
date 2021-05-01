import React from 'react'
import { CardHeader, UnInput, UnInputDateTime, UnSelect } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'

const groupOptions = [
	{value: 1, label: 'teste1'},
	{value: 2, label: 'teste2'},
	{value: 3, label: 'teste3'},
	{value: 4, label: 'teste4'},
	{value: 5, label: 'teste5'},
	{value: 6, label: 'teste6'},
]

function DadosVisita() {
	const cooperado = 'Miguel Teixeira'
	const terreno = 'Recanto'
	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='500px'>
					<CardHeader title='Detalhes da Visita'/>
					<UnForm>
						<UnInput disabled name='cooperado' label='Cooperado' value={cooperado}/>
						<UnInput disabled name='propriedade' label='Propriedade'  value={terreno}/>
						<InputWrapper columns={2} gap='10px'>
							<UnInputDateTime disabled name='data' label='Data' dateFormat='dd/mm/yy' mask='99/99/9999' showIcon required/>
							<UnInputDateTime disabled timeOnly  name='horaEstimada' label='Hora Estimada' mask='99:99'/>
						</InputWrapper>
						<UnSelect disabled name='motivo' label='Motivo da Visita' options={groupOptions}/>
					</UnForm>
					<Button label='Imprimir'/>
				</Card>
			</Content>
		</Container>
	)
}

export default DadosVisita