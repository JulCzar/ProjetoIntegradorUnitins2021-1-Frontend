import React from 'react'
import { useHistory } from 'react-router'
import { UnInputDateTime, UnSelect } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button} from '~/primereact'
import { ManagementTemplate } from '~/template'

function RelatorioCooperado() {
	const history = useHistory()
	const [startDate, setStartDate] = React.useState(null)
	const [endDate, setEndDate] = React.useState(null)

  const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	])
  const gerarRelatorio = form => {
    const data = JSON.stringify(form)

		history.push(`/cooperado/relatorio/${btoa(data)}`)
  }

  return (
  <ManagementTemplate title='Relatório de Cooperado'>
		<UnForm onSubmit={gerarRelatorio}>
			<InputWrapper columns={2} gap='10px'>
				<UnInputDateTime
					showIcon
					required
					name='start'
					label='Inicio'
					mask='99/99/9999'
					maxDate={endDate}
					onChange={evt => setStartDate(evt.value)}/>
				<UnInputDateTime
					showIcon
					required
					name='end'
					label='Fim'
					mask='99/99/9999'
					minDate={startDate}
					onChange={evt => setEndDate(evt.value)}/>
			</InputWrapper>
			<UnSelect name='cooperado' label='Cooperado' options={groupOptions} required/>
			<Button type='submit' label='Gerar Relatório'/>
		</UnForm>
	</ManagementTemplate>
  )}

export default RelatorioCooperado