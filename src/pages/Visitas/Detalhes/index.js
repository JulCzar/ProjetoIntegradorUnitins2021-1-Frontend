import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Controller, useForm } from 'react-hook-form'

import { Button, Calendar, InputText, InputTextarea, MultiSelect, Toast } from '~/primereact'
import { CardHeader, InputContainer } from '~/common/components'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import { ContainerWithTemplate } from '~/pages/templates'
import { Block, InputWrapper } from '~/common/styles'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'

function DetalhesVisita() {
	const history = useHistory()
	const [motivosSelecionados, setMotivosSelecionados] = React.useState([])
	const [motivos, setMotivos] = React.useState([])
	
	const [visitDay, setVisitDay] = React.useState(null)
	const [visitHour, setVisitHour] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const [data, setData] = React.useState(null)

	const { control, handleSubmit, errors, setValue, reset } = useForm()
	const [editing, setEditing] = React.useState(false)
	const { id } = useParams()

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		(async function() {
			setLoading(true)

			const promises = [carregarMotivosVisita(), carregarDadosVisita()]
			await Promise.all(promises)

			setLoading(false)
		})()
	}, [])

	React.useEffect(() => {
		setValue('horaEstimada', visitDay)
	}, [visitDay])
	
	async function carregarDadosVisita() {
		try {
			const { data: resp } = await api.get(`/visita/${id}`)
			const { dia_visita: date, horario_estimado_visita: time } = resp

			resp.motivos = resp.motivo_visita.split(',').map(i => i.trim())
			resp.data = new Date(`${date}T${time}.000Z`)
			
			resp.horaEstimada = resp.data
			setVisitDay(resp.data)
			setVisitHour(resp.data)
			setMotivosSelecionados(resp.motivos)

			setData(resp)

			reset()

			Object.entries(resp).forEach(([key, value]) => setValue(key, value))
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} 
	}

	async function carregarMotivosVisita() {
		try {
			const { data } = await api.get('/motivos')

			setMotivos(data)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		}
	}

	async function salvar(form) {
		const { motivos, observacao } = form

		const data = {
			motivo_visita: motivos.join(', '),
			horaEstimada: visitHour,
			dia_visita: visitDay,
			observacao
		}

		try {
			setLoading(true)
			
			await api.put(`/visitas/${id}`, data)

			history.goBack()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setEditing(false)
			setLoading(false)
		}	
	}

	const cancelEdit = () => {
		setEditing(false)
		reset()
		Object.entries(data).forEach(([key, value]) => setValue(key, value))
	}

	return (
		<ContainerWithTemplate contentClassName='p-mt-5' loading={loading}>
			<Block className='p-p-3 p-fluid'>
				<Toast ref={toastRef} />
				<CardHeader title='Detalhes da Visita'/>
				<form onSubmit={handleSubmit(salvar)}>
					<InputContainer name='cooperado' label='Cooperado'>
						<InputText
							disabled
							value={data?.cooperado || ''}/>
					</InputContainer>
					<InputContainer name='propriedade' label='Propriedade'>
						<InputText
							disabled
							value={data?.propriedade||''}
						/>
					</InputContainer>
					<InputWrapper columns={2} gap='10px'>
						<Controller
							name='data'
							control={control}
							defaultValue={data?new Date(data.data):null}
							render={({ name, value, onChange }) => (
								<InputContainer name={name} label='Data'>
									<Calendar
										disabled={!editing}
										showIcon={editing}
										id={name}
										name={name}
										value={value}
										mask='99/99/9999'
										minDate={new Date()}
										onChange={evt => {
											setVisitDay(evt.value)
											onChange(evt.value)
										}}
									/>
								</InputContainer>
							)}
						/>
						<Controller
							name='horaEstimada'
							control={control}
							defaultValue={data?new Date(data.data):null}
							render={({ name, value, onChange }) => (
								<InputContainer name={name} label='Hora Estimada'>
									<Calendar
										timeOnly
										id={name}
										name={name}
										mask='99:99'
										value={value}
										showIcon={editing}
										onChange={evt => {
											setVisitHour(evt.value)
											onChange(evt.value)
										}}
										disabled={!editing}
									/>
								</InputContainer>
							)}
						/>
					</InputWrapper>
					<Controller
						name='motivos'
						control={control}
						rules={validate.selectReason}
						defaultValue={data?data.motivos:[]}
						render={({ name, onChange }) => (
							<InputContainer name={name} label='Motivo da Visita' error={errors[name]}>
								<MultiSelect
									filter
									id={name}
									name={name}
									value={motivosSelecionados}
									options={motivos}
									optionValue='nome'
									optionLabel='nome'
									disabled={!editing}
									onChange={evt => {
										onChange(evt.value)
										setMotivosSelecionados(evt.value)
									}}
									className={getInvalidClass(errors[name])}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='observacao'
						control={control}
						defaultValue={data?(data.observacao || ''):''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Observações'>
								<InputTextarea
									id={name}
									autoResize
									name={name}
									value={value}
									disabled={!editing}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<InputWrapper type='button' columns={!editing?3:2} gap='10px'>
						{!editing && <Button type='button' label='Cancelar Visita'/>}
						{!editing && <Button type='button' onClick={() => setEditing(true)} label='Editar Visita'/>}
						{!editing && <Button type='button' label='Concluir Visita'/>}
						{editing && <Button type='button' onClick={cancelEdit} label='Cancelar'/>}
						{editing && <Button label='Salvar Alterações'/>}
					</InputWrapper>
				</form>
			</Block>
		</ContainerWithTemplate>
	)
}

export default DetalhesVisita