import React from 'react'

import { CardHeader, UnAutoComplete, UnInputDateTime, UnSelect } from '~/common/components'
import { Block, InputWrapper, UnForm } from '~/common/styles'
import { ContainerWithTemplate } from '~/template'
import { Button, Toast } from '~/primereact'
import { getStringNormalized } from '~/utils'

import cooperados from './cooperados.json'
import { getToastInstance } from '~/services'

function AgendarVisita() {
	const toastRef = React.useRef(null)
	const [cooperadosFiltrados, setCooperadosFiltrados] = React.useState([])
	const [groups, setGroups] = React.useState([
		{value: 1, label: 'teste1'},
		{value: 2, label: 'teste2'},
		{value: 3, label: 'teste3'},
		{value: 4, label: 'teste4'},
		{value: 5, label: 'teste5'},
		{value: 6, label: 'teste6'},
	])
	const toast = getToastInstance(toastRef)

	const validateForm = form => {
		const { cooperado, propriedade, motivo } = form
		const { value } = cooperado || { value: null }
		
		if (![propriedade, motivo, value].includes(null))
			return true

		return false
	}

	const agendar = form => {
		const isValid = validateForm(form)
		
		if (!isValid) return toast.showWarn('Ainda há campos para serem selecionados')
		
		console.log(form) // eslint-disable-line no-console
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
			<Toast ref={toastRef}/>
			<Block className='p-p-3 p-fluid'>
				<CardHeader title='Agendar Visita'/>
				<UnForm onSubmit={agendar}>
					<UnAutoComplete
						name='cooperado'
						field='label'
						label='Cooperado'
						suggestions={cooperadosFiltrados}
						completeMethod={filtrarCooperado}
						required
					/>
					<UnSelect name='propriedade' label='Propriedade' options={groups} required/>
					<InputWrapper columns={2} gap='10px'>
						<UnInputDateTime name='data' label='Data' dateFormat='dd/mm/yy' mask='99/99/9999' showIcon required/>
						<UnInputDateTime timeOnly  name='horaEstimada' label='Hora Estimada' mask='99:99' required/>
					</InputWrapper>
					<UnSelect name='motivo' label='Motivo da Visita' options={groups} required/>
					<Button label='Agendar Visita' />
				</UnForm>
			</Block>
		</ContainerWithTemplate>
	)
}

export default AgendarVisita