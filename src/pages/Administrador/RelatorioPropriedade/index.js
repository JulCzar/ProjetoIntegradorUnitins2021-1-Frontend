import React from 'react'
import { UnInputDateTime, UnSelect } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button} from '~/primereact'
import { ManagementTemplate } from '~/template'

function RelatorioPropriedade() {
	const [startDate, setStartDate] = React.useState(null)
	const [endDate, setEndDate] = React.useState(null)

  const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	])
  const enviar = form => {
    // eslint-disable-next-line no-console
    console.log(form)
  }

  return (
  <ManagementTemplate title='Relatório de Propriedade'>
		<UnForm onSubmit={enviar}>
			<InputWrapper columns={2} gap='10px'>
				<UnInputDateTime
					showIcon
					name='inicio'
					label='Inicio'
					mask='99/99/9999'
					maxDate={endDate}
					onChange={evt => setStartDate(evt.value)}/>
				<UnInputDateTime
					showIcon
					mask='99/99/9999'
					name='fim'
					label='Fim'
					minDate={startDate}
					onChange={evt => setEndDate(evt.value)}/>
			</InputWrapper>
			<UnSelect name='cooperado' label='Cooperado' options={groupOptions}/>
			<UnSelect name='propriedade' label='Propriedade' options={groupOptions}/>
			<UnSelect name='tecnico' label='Técnico' options={groupOptions}/>
			<Button type='submit' label='Gerar Relatório'/>
		</UnForm>
	</ManagementTemplate>
  )}

export default RelatorioPropriedade