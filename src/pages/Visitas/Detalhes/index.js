import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Controller, useForm } from 'react-hook-form'

import { Button, Calendar, Dialog, FileUpload, InputText, InputTextarea, ListBox, MultiSelect, Toast } from '~/primereact'
import { CardHeader, InputContainer } from '~/common/components'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import { ContainerWithTemplate } from '~/pages/templates'
import { Block, InputWrapper } from '~/common/styles'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'

function DetalhesVisita() {
	const history = useHistory()
	const [motivosSelecionados, setMotivosSelecionados] = React.useState([])
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [motivos, setMotivos] = React.useState([])
	const [talhoes, setTalhoes] = React.useState([])
	
	const [visitDay, setVisitDay] = React.useState(null)
	const [visitHour, setVisitHour] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const [data, setData] = React.useState({observacao: ''})

	const { control, handleSubmit, errors, setValue, reset } = useForm()
	const talhaoForm = useForm()

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

			Object.entries(resp).forEach(([key, value]) => {
				if (value) setValue(key, value)
			})
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

		const data = new FormData()
		data.append('motivo_visita', motivos.join(', '))
		data.append('horaEstimada', visitHour.toJSON())
		data.append('dia_visita', visitDay.toJSON())
		data.append('observacao', observacao)
		data.append('talhoes[]', talhoes)

		try {
			setLoading(true)
			
			await api.post(`/visitas/${id}`, data)

			history.goBack()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setEditing(false)
			setLoading(false)
		}	
	}

	function addTalhao(form) {
		setTalhoes([...talhoes, form])
		setModalVisibility(false)
	}

	const cancelEdit = () => {
		setEditing(false)
		reset()
		Object.entries(data).forEach(([key, value]) => setValue(key, value))
	}

	return (
		<ContainerWithTemplate contentContainerClassName='p-d-flex p-ai-start p-flex-wrap' contentClassName='p-mt-5' loading={loading}>
			<Block className='p-p-3 p-ml-3 p-mt-3 p-fluid'>
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
						defaultValue={data?data.observacao:''}
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

			<Block className='p-p-3 p-ml-3 p-mt-3 p-fluid'>
				<CardHeader title='Talhões'/>
				<ListBox
					className='p-mb-5'
					options={talhoes}
					optionLabel='cultura'/>
				<Button
					type='button'
					className='p-mb-3'
					onClick={() => setModalVisibility(true)}
				>Inserir detalhes de um talhão</Button>
			</Block>

			<Dialog
				draggable={false}
				visible={modalVisibility}
				style={{ width: '50vw' }}
				header='Detalhes do Talhão'
				onHide={() => setModalVisibility(false)}
				breakpoints={{'960px': '75vw', '640px': '100vw'}}
			>
				<form className='p-fluid' onSubmit={talhaoForm.handleSubmit(addTalhao)}>
					<Controller
						name='cultura'
						defaultValue=''
						control={talhaoForm.control}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Cultura Cultivada'>
								<InputText name={name} value={value} onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}
					/>
					<Controller
						name='relatorio'
						defaultValue=''
						control={talhaoForm.control}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Relatório'>
								<InputTextarea autoResize value={value} onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}
					/>
					<Controller 
						name='imagens'
						defaultValue={[]}
						control={talhaoForm.control}
						render={({ name, onChange }) => (
							<InputContainer name={name} label='Imagens da Visita'>
								<FileUpload
									auto
									multiple
									name={name}
									customUpload
									accept="image/*"
									maxFileSize={Infinity}
									uploadHandler={evt => onChange(evt.files)}
								/>
							</InputContainer>
						)}
					/>
					<Button className='p-flex p-jc-center'>Adicionar</Button>
				</form>
			</Dialog>
		</ContainerWithTemplate>
	)
}

export default DetalhesVisita