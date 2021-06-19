import React, { useEffect, useRef, useState } from 'react'
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

function RelatorioPropriedade() {
	const { control, errors, handleSubmit } = useForm()
	const [loading, setLoading] = useState(false)

	const toastRef = useRef(null)
	const toast = getToastInstance(toastRef)
	
	const [permissions, setPermissions] = React.useState([])
  const [propriedades, setPropriedades] = useState([])
  const [cooperados, setCooperados] = useState([])
	
	const [cooperado, setCooperado] = useState(null)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	const history = useHistory()

	useEffect(() => {
		loadCooperados()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	useEffect(() => {
		loadPropriedades()
	}, [cooperado])

	async function loadCooperados() {
		try {
			setLoading(true)
			const { data } = await api.get('/cooperado/index')

			setCooperados(data)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	async function loadPropriedades() {
		// O cooperado nunca será zero, então evita que a pesquisa lance um erro
		// por pesquisar propriedades do cooperado com id nulo
		if (!cooperado) return

		try {
			setLoading(true)
			const { data } = await api.get(`/propriedades/${cooperado}`)

			setPropriedades(data)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

  async function enviar(form) {
		const { view, ...params } = form
		const dataJSON = JSON.stringify(form)
		const config = { params }
		
		try {
			setLoading(true)

			const { data } = await api.get('/relatorio/propriedade', config)
			
			const chartData = parseResponseToCharts(data, view)

			history.push(`/propriedade/relatorio/${btoa(dataJSON)}`, chartData)
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
  <ManagementTemplate title='Relatório de Propriedade' loading={loading}>
		<Toast ref={toastRef}/>
		<form onSubmit={handleSubmit(enviar)}>
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
				name='cooperado'
				control={control}
				defaultValue={null}
				rules={validate.selectCooperado}
				render={({ name, value, onChange }) => (
				<InputContainer name={name} label='Cooperado' error={errors[name]}>
					<Dropdown
						showIcon
						name={name}
						value={value}
						optionValue='id'
						options={cooperados}
						optionLabel='nome_cooperado'
						className={getInvalidClass(errors[name])}
						onChange={evt => {
							onChange(evt.value)
							setCooperado(evt.value)
						}}/>
				</InputContainer>
			)}/>
			<Controller
				name='propriedade'
				control={control}
				defaultValue={null}
				rules={validate.selectProperty}
				render={({ name, value, onChange }) => (
				<InputContainer name={name} label='Propriedade' error={errors[name]}>
					<Dropdown
						showIcon
						name={name}
						value={value}
						optionValue='id'
						optionLabel='nome'
						options={propriedades}
						className={getInvalidClass(errors[name])}
						placeholder={!cooperado?'Selecione primeiro um cooperado':'Selecione uma propriedade'}
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

export default RelatorioPropriedade