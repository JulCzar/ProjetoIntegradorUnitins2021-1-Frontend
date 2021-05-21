import { Controller, useForm } from 'react-hook-form'
import React from 'react'

import { AutoComplete, Button, Calendar, Dropdown, MultiSelect } from '~/primereact'
import { CardHeader, InputContainer } from '~/common/components'
import { getInvalidClass, getStringNormalized } from '~/utils'
import { ContainerWithTemplate } from '~/pages/templates'
import { Block, InputWrapper } from '~/common/styles'

import propriedadesJSON from './propriedades.json'
import * as validation from '~/config/validations'
import { useLocation } from 'react-router'
import cooperados from './cooperados.json'
import motivosJSON from './motivos.json'
import { format } from 'date-fns'

function AgendarVisita() {
	const [cooperadosFiltrados, setCooperadosFiltrados] = React.useState([])
	const [propriedades, setPropriedades] = React.useState([])
	const [motivos, setMotivos] = React.useState([])
	const location = useLocation()
	
	const { control, errors, handleSubmit, reset, setValue } = useForm()
	
	React.useEffect(() => {
		setPropriedades(propriedadesJSON)
		setMotivos(motivosJSON)
		if (location.state) {
			const dataVisita = new Date(location.state)
			setValue('data', dataVisita)
			
			if (format(dataVisita, 'hh:mm') !== '12:00')
				setValue('horaEstimada', dataVisita)
		}
	}, [])

	const agendar = form => {
		console.log(form) // eslint-disable-line no-console
		
		reset()
	}

	const filtrarCooperado = event => {
		const cooperadosFiltrados = cooperados
			.filter(i => {
				const pesquisaNormalizada = getStringNormalized(event.query.toLowerCase())
				const nomeCooperadoNormalizado = getStringNormalized(i.label.toLowerCase())
				return nomeCooperadoNormalizado.startsWith(pesquisaNormalizada)
			})

		setCooperadosFiltrados(cooperadosFiltrados)
	}

	return (
		<ContainerWithTemplate contentClassName='p-mt-5'>
			<Block className='p-p-3 p-fluid'>
				<CardHeader title='Agendar Visita'/>
				<form onSubmit={handleSubmit(agendar)}>
					<Controller
						name='cooperado'
						control={control}
						defaultValue={false}
						rules={validation.selectCooperadoValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Cooperado' error={errors[name]}>
								<AutoComplete
									field='label'
									value={value}
									suggestions={cooperadosFiltrados}
									completeMethod={filtrarCooperado}
									onChange={e => onChange(e.value)}
									className={getInvalidClass(errors[name])}/>
							</InputContainer>
						)}
					/>
					<Controller
						name='propriedade'
						control={control}
						defaultValue={false}
						rules={validation.selectPropertyValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Propriedade' error={errors[name]}>
								<Dropdown
									options={propriedades}
									value={value}
									onChange={e => onChange(e.value)}
									className={getInvalidClass(errors[name])}/>
							</InputContainer>
						)}/>
					<InputWrapper columns={2} gap='10px'>
						<Controller
							name='data'
							control={control}
							rules={validation.dayValidation}
							defaultValue={false}
							render={({ name, value, onChange }) => (
								<InputContainer label='Data' name='data' error={errors.data}>
								<Calendar
									showIcon
									mask='99/99/9999'
									value={value}
									minDate={new Date()}
									dateFormat='dd/mm/yy'
									onChange={e => onChange(e.value)}
									className={getInvalidClass(errors[name])}/>
							</InputContainer>
						)}/>
						<Controller
							name='horaEstimada'
							control={control}
							rules={validation.hourValidation}
							defaultValue={false}
							render={({ name, value, onChange }) => (
								<InputContainer label='Hora Estimada' name={name} error={errors[name]}>
									<Calendar
										timeOnly
										mask='99:99'
										value={value}
										onChange={e => {
											onChange(e.value)
											console.log(e)
										}}
										className={getInvalidClass(errors[name])}
									/>
								</InputContainer>
						)}/>
					</InputWrapper>
					<Controller
						name='motivo'
						control={control}
						defaultValue={false}
						rules={validation.selectReasonValidation}
						render={({ name, value, onChange }) => (
							<InputContainer label='Motivo da Visita' name={name} error={errors[name]}>
								<MultiSelect
									value={value}
									options={motivos}
									className={getInvalidClass(errors[name])}
									onChange={e => onChange(e.value)}/>
							</InputContainer>
						)}/>
					<Button label='Agendar Visita' />
				</form>
			</Block>
		</ContainerWithTemplate>
	)
}

export default AgendarVisita