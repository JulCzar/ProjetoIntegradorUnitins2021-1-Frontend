import React, { useEffect, useState, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { viewTypes } from '~/pages/Gerencia/Relatorios/viewTypes'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import { Button, Calendar, Dropdown, Toast} from '~/primereact'
import parseResponseToCharts from './parseResponseToCharts'
import { ManagementTemplate } from '~/pages/templates'
import { InputContainer } from '~/common/components'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

function RelatorioTecnico() {
	const { control, errors, handleSubmit } = useForm()
	const [loading, setLoading] = useState(false)

	const [permissions, setPermissions] = React.useState([])
  const [tecnicos, setTecnicos] = useState([])

	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	const history = useHistory()

	const toastRef = useRef(null)
	const toast = getToastInstance(toastRef)

	useEffect(() => {
		loadTecnicos()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	async function loadTecnicos() {
		try {
			const { data } = await api.get('/tecnico/index')

			setTecnicos(data)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		}
	}

  async function gerarRelatorio(form) {
		const { view, ...params } = form
		const dataJSON = JSON.stringify(form)
		const config = { params }
		
		try {
			setLoading(true)

			const { data } = await api.get('/relatorio/tecnico', config)
			
			const chartData = parseResponseToCharts(data, view)

			history.push(`/tecnico/relatorio/${btoa(dataJSON)}`, chartData)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
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

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth
		
		setPermissions(permissions ?? [])
	}

	if (!permissions.includes(6)) return <PageNotFound/>

  return (
		<ManagementTemplate title='Relatório de Técnico' loading={loading}>
			<Toast ref={toastRef}/>
			<form onSubmit={handleSubmit(gerarRelatorio)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='start'
						control={control}
						defaultValue={null}
						rules={validate.startRelatorio}
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
						rules={validate.endRelatorio}
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
					name='tecnico'
					control={control}
					defaultValue={null}
					rules={validate.selectTecnico}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Técnico' error={errors[name]}>
						<Dropdown
							showIcon
							name={name}
							value={value}
							optionValue='id'
							options={tecnicos}
							optionLabel='nome_tecnico'
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.value)}/>
					</InputContainer>
				)}/>
				<Controller
					name='view'
					control={control}
					defaultValue={null}
					rules={validate.dropdownGeneric}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Visualização' error={errors[name]}>
						<Dropdown
							showIcon
							name={name}
							value={value}
							options={viewTypes}
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.value)}/>
					</InputContainer>
				)}/>
				<Button type='submit' label='Gerar Relatório'/>
			</form>
		</ManagementTemplate>
  )}

export default RelatorioTecnico