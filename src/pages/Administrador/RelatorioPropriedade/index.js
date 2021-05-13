import React from 'react'
import { UnInputDateTime, UnSelect } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button} from '~/primereact'
import { AdminTemplate } from '~/template'

function RelatorioPropriedade() {
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
  <AdminTemplate title='Relatório de Propriedade'>
		<UnForm onSubmit={enviar}>
			<InputWrapper columns={2} gap='10px'>
				<UnInputDateTime mask='99/99/9999' showIcon name='inicio' label='Inicio'/>
				<UnInputDateTime mask='99/99/9999' showIcon name='fim' label='Fim'/>
			</InputWrapper>
			<UnSelect name='cooperado' label='Cooperado' options={groupOptions}/>
			<UnSelect name='propriedade' label='Propriedade' options={groupOptions}/>
			<UnSelect name='tecnico' label='Técnico' options={groupOptions}/>
			<Button type='submit' label='Gerar Relatório'/>
		</UnForm>
	</AdminTemplate>
  )}

export default RelatorioPropriedade