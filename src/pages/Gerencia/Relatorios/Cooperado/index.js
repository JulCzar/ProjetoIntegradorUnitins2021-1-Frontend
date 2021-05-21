import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import * as validation from '~/config/validations'
import { Button, Calendar, Dropdown} from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { getInvalidClass } from '~/utils'

function RelatorioCooperado() {
	const { control, errors, handleSubmit, reset } = useForm()

	const [startDate, setStartDate] = React.useState(null)
	const [endDate, setEndDate] = React.useState(null)
	const history = useHistory()

  const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	])
  const gerarRelatorio = form => {
    const data = JSON.stringify(form)

		reset()
		history.push(`/cooperado/relatorio/${btoa(data)}`)
  }

	/** @param {'start' | 'end'} key */
	const handleDateChange = (key, valueSetter) => {
		const handler = {
			start: setStartDate,
			end: setEndDate
		}[key]
		
		return evt => {
			handler(evt.value)
			valueSetter(evt.value)
		}
	}

  return (
  <ManagementTemplate title='Relatório de Cooperado'>
		<form onSubmit={handleSubmit(gerarRelatorio)}>
			<InputWrapper columns={2} gap='10px'>
				<Controller
					name='start'
					control={control}
					defaultValue={null}
					rules={validation.startRelatorioValidation}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Inicio' error={errors[name]}>
						<Calendar
							showIcon
							name={name}
							value={value}
							mask='99/99/9999'
							maxDate={endDate}
							className={getInvalidClass(errors[name])}
							onChange={handleDateChange(name, onChange)}/>
					</InputContainer>
				)}/>
				<Controller
					name='end'
					control={control}
					defaultValue={null}
					rules={validation.endRelatorioValidation}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Fim' error={errors[name]}>
						<Calendar
							showIcon
							name={name}
							value={value}
							mask='99/99/9999'
							minDate={startDate}
							className={getInvalidClass(errors[name])}
							onChange={handleDateChange(name, onChange)}/>
					</InputContainer>
				)}/>
			</InputWrapper>
			<Controller
				name='cooperado'
				control={control}
				defaultValue={null}
				rules={validation.selectCooperadoValidation}
				render={({ name, value, onChange }) => (
				<InputContainer name={name} label='Cooperado' error={errors[name]}>
					<Dropdown
						showIcon
						name={name}
						value={value}
						options={groupOptions}
						className={getInvalidClass(errors[name])}
						onChange={evt => onChange(evt.value)}/>
				</InputContainer>
			)}/>
			<Button type='submit' label='Gerar Relatório'/>
		</form>
	</ManagementTemplate>
  )}

export default RelatorioCooperado