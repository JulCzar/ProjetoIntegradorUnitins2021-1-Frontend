import { Controller, useForm } from 'react-hook-form'
import React from 'react'

import { AutoComplete, Button, Calendar, Dropdown, MultiSelect, Toast } from '~/primereact'
import { CardHeader, InputContainer } from '~/common/components'
import { getApiResponseErrors, getInvalidClass, getStringNormalized } from '~/utils'
import { ContainerWithTemplate } from '~/pages/templates'
import { Block, InputWrapper } from '~/common/styles'

import * as validate from '~/config/validations'
import { useHistory, useLocation } from 'react-router'
import { format } from 'date-fns'
import { api, getToastInstance } from '~/services'
import { store } from '~/store'

function AgendarVisita() {
	const { control, errors, handleSubmit, reset, setValue } = useForm()
	const [visitDay, setVisitDay] = React.useState(null)
	const [visitHour, setVisitHour] = React.useState(null)

	// cooperado selecionado
	const [cooperado, setCooperado] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	
	// listas
	const [cooperadosFiltrados, setCooperadosFiltrados] = React.useState([])
	const [propriedades, setPropriedades] = React.useState([])
	const [cooperados, setCooperados] = React.useState([])
	const [motivos, setMotivos] = React.useState([])

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)
	
	// Parâmetro da URL
	const { state } = useLocation()
	const history = useHistory()

	React.useEffect(() => {
		loadData()

		if (!state) return
		const dataVisita = new Date(state)
		setValue('data', dataVisita)
		setVisitDay(dataVisita)
		console.log(format(dataVisita, 'hh:mm') !== '12:00')
		if (format(dataVisita, 'hh:mm') !== '12:00')
			setValue('horaEstimada', dataVisita)
	}, [])

	React.useEffect(() => {
		if (!cooperado) return setPropriedades([])

		carregarPropriedades()
	}, [cooperado])

	React.useEffect(() => {
		if (!visitDay) return
		
		setValue('horaEstimada', visitDay)
	}, [visitDay])
	
	async function loadData() {
		setLoading(true)
		const promises = [carregarCooperados(), carregarMotivos()]

		await Promise.all(promises)

		setLoading(false)
	}

	/**
	 * @param {string | () => string} endpoint 
	 * @param {React.Dispatch<React.SetStateAction<any>} dispatch 
	 * @returns 
	 */
	function carregarAlgo(endpoint, dispatch) {
		return async function () {
			const rota = typeof endpoint !== 'function'?endpoint:endpoint()
			
			try {
				const { data } = await api.get(rota)
	
				dispatch(data)
			} catch ({ response }) {
				toast.showErrors(getApiResponseErrors(response))
			}
		}
	}

	const carregarMotivos = carregarAlgo('/motivos', setMotivos)
	const carregarCooperados = carregarAlgo('/cooperado/index', setCooperados)
	const carregarPropriedades = async () => {
		setLoading(true)
		const getEndpoint = () => `/propriedades/${cooperado.id}`
		await carregarAlgo(getEndpoint, setPropriedades)()
		setLoading(false)
	}

	async function agendar(form) {
		const { auth } = store.getState()
		const { propriedade, motivos } = form
		
		const data = {
			motivo_visita: motivos.map(m => m.nome).join(', '),
			id_propriedade: propriedade.id,
			horaEstimada: visitHour,
			id_user: auth.user.id,
			dia_visita: visitDay
		}
		try {
			setLoading(true)
			
			await api.post('/visitas', data)

			history.goBack()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
			reset()
		}
	}

	const filtrarCooperado = event => {
		const cooperadosFiltrados = [...cooperados]
			.filter(i => {
				const pesquisaNormalizada = getStringNormalized(event.query.toLowerCase())
				const nomeCooperadoNormalizado = getStringNormalized(i.nome_cooperado.toLowerCase())
				return nomeCooperadoNormalizado.startsWith(pesquisaNormalizada)
			})

		setCooperadosFiltrados(cooperadosFiltrados)
	}

	return (
		<ContainerWithTemplate loading={loading} contentClassName='p-mt-5'>
			<Toast ref={toastRef}/>
			<Block className='p-p-3 p-fluid'>
				<CardHeader title='Agendar Visita'/>
				<form onSubmit={handleSubmit(agendar)}>
					<Controller
						name='cooperado'
						control={control}
						defaultValue={null}
						rules={validate.selectCooperado}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Cooperado' error={errors[name]}>
								<AutoComplete
									dropdown
									value={value}
									field='nome_cooperado'
									suggestions={cooperadosFiltrados}
									completeMethod={filtrarCooperado}
									className={getInvalidClass(errors[name])}
									onSelect={evt => {
										setCooperado(evt.value)
										onChange(evt.value)
									}}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='propriedade'
						control={control}
						defaultValue={null}
						rules={validate.selectProperty}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Propriedade' error={errors[name]}>
								<Dropdown
									value={value}
									options={propriedades.map(p => ({label: p.nome, value: p}))}
									onChange={e => onChange(e.value)}
									className={getInvalidClass(errors[name])}/>
							</InputContainer>
						)}/>
					<InputWrapper columns={2} gap='10px'>
						<Controller
							name='data'
							control={control}
							rules={validate.day}
							defaultValue={null}
							render={({ name, value, onChange }) => (
								<InputContainer label='Data' name='data' error={errors.data}>
								<Calendar
									showIcon
									value={value}
									mask='99/99/9999'
									minDate={new Date()}
									className={getInvalidClass(errors[name])}
									onChange={e => {
										setVisitDay(e.value)
										onChange(e.value)
									}}
								/>
							</InputContainer>
						)}/>
						<Controller
							name='horaEstimada'
							control={control}
							rules={validate.hour}
							defaultValue={null}
							render={({ name, value, onChange }) => (
								<InputContainer label='Hora Estimada' name={name} error={errors[name]}>
									<Calendar
										showIcon
										timeOnly
										mask='99:99'
										value={value}
										onChange={e => {
											setVisitHour(e.value)
											onChange(e.value)
										}}
										className={getInvalidClass(errors[name])}
									/>
								</InputContainer>
						)}/>
					</InputWrapper>
					<Controller
						name='motivos'
						control={control}
						defaultValue={null}
						rules={validate.selectReason}
						render={({ name, value, onChange }) => (
							<InputContainer label='Motivo da Visita' name={name} error={errors[name]}>
								<MultiSelect
									filter
									value={value}
									onChange={e => onChange(e.value)}
									className={getInvalidClass(errors[name])}
									options={motivos.map(m => ({label: m.nome, value: m}))}
								/>
							</InputContainer>
						)}/>
					<Button label='Agendar Visita' />
				</form>
			</Block>
		</ContainerWithTemplate>
	)
}

export default AgendarVisita