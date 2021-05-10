import React from 'react'
import { UnInput, UnInputDateTime, UnSelect } from '~/common/components'
import UnTextArea from '~/common/components/UnTextArea'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button } from '~/primereact'
import { AdminTemplate } from '~/template'

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
		<AdminTemplate title='Detalhes da Visita'>
			<UnForm>
				<UnInput disabled name='cooperado' label='Cooperado' value={cooperado}/>
				<UnInput disabled name='propriedade' label='Propriedade'  value={terreno}/>
				<InputWrapper columns={2} gap='10px'>
					<UnInputDateTime disabled name='data' label='Data' dateFormat='dd/mm/yy' mask='99/99/9999' showIcon required/>
					<UnInputDateTime disabled timeOnly  name='horaEstimada' label='Hora Estimada' mask='99:99'/>
				</InputWrapper>
				<UnSelect disabled name='motivo' label='Motivo da Visita' options={groupOptions}/>
				<UnTextArea disabled name='observacoes' label='Observações' autoResize />
				<Button type='button' label='Imprimir'/>
			</UnForm>
		</AdminTemplate>
	)
}

export default DadosVisita