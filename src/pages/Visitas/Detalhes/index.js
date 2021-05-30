import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CardHeader, InputContainer } from '~/common/components'
import { Block, InputWrapper } from '~/common/styles'
import { AutoComplete, Button, Calendar, InputText, InputTextarea, MultiSelect, Toast } from '~/primereact'
import { api, getToastInstance } from '~/services'
import { ContainerWithTemplate } from '~/pages/templates'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import { useParams } from 'react-router'
import * as validate from '~/config/validations'

function DetalhesVisita() {
	const [cooperadosFiltrados, setCooperadosFiltrados] = React.useState([])
	const [motivos, setMotivos] = React.useState([])
	
	const [loading, setLoading] = React.useState(false)
	const [visitDay, setVisitDay] = React.useState(null)
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
			const {
				dia_visita: date,
				horario_estimado_visita: time
			} = resp
			resp.data = new Date(`${date}T${time}.000Z`)
			resp.horaEstimada = resp.data
			resp.motivos = resp.motivo_visita.split(',').map(i => i.trim())
			
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

	const validateForm = form => {
		const { cooperado, propriedade, motivo } = form
		const { value } = cooperado || { value: null }
		
		if (![propriedade, motivo, value].includes(null))
			return true

		return false
	}

	const salvar = form => {
		const isValid = validateForm(form)
		
		if (!isValid) return toast.showWarn('Você está deixando campos requeridos vazios!')
		
		setEditing(false)
		console.log(form) // eslint-disable-line no-console
	}

	const cancelEdit = () => {
		setEditing(false)
		reset()
		Object.entries(data).forEach(([key, value]) => setValue(key, value))
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
		<ContainerWithTemplate contentClassName='p-mt-5' loading={loading}>
			<Block className='p-p-3 p-fluid'>
				<Toast ref={toastRef} />
				<CardHeader title='Detalhes da Visita'/>
				<form onSubmit={handleSubmit(salvar)}>
					<Controller
						name='cooperado'
						control={control}
						defaultValue={data?data.cooperado:''}
						render={({ name, value }) => (
							<InputContainer name={name} label='Cooperado' error={errors[name]}>
								<AutoComplete
									disabled
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
						defaultValue={data?data.propriedade:''}
						render={({ name, value }) => (
							<InputContainer name={name} label='Propriedade'>
								<InputText
									disabled
									id={name}
									name={name}
									value={value}
								/>
							</InputContainer>
						)}
					/>
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
										dateFormat='dd/mm/yy'
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
										onChange={evt => onChange(evt.value)}
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
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Motivo da Visita' error={errors[name]}>
								<MultiSelect
									filter
									id={name}
									name={name}
									value={value}
									options={motivos}
									optionValue='nome'
									optionLabel='nome'
									disabled={!editing}
									onChange={evt => onChange(evt.value)}
									className={getInvalidClass(errors[name])}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='observacoes'
						control={control}
						defaultValue={data?data.observacoes:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Observações'>
								<InputTextarea
									id={name}
									autoResize
									name={name}
									value={value}
									options={motivos}
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