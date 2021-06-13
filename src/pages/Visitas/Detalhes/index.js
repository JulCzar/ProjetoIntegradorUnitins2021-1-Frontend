import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Controller, useForm } from 'react-hook-form'

import { Button, Calendar, confirmPopup, Dialog, FileUpload, InputText, InputTextarea, ListBox, MultiSelect, Toast } from '~/primereact'
import { CardHeader, InputContainer } from '~/common/components'
import { getApiResponseErrors, getInvalidClass } from '~/utils'
import { ContainerWithTemplate } from '~/pages/templates'
import { Block, InputWrapper } from '~/common/styles'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'
import { confirmDialog } from 'primereact/confirmdialog'

function DetalhesVisita() {
	/** @type {[{cultura:string,relatorio:string,imagens:File[]}[], React.Dispatch<React.SetStateAction<{cultura:string,relatorio:string,imagens:File[]}[]>]} */
	const [talhoes, setTalhoes] = React.useState([])
	const [motivosSelecionados, setMotivosSelecionados] = React.useState([])
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [motivos, setMotivos] = React.useState([])
	
	const [visitDay, setVisitDay] = React.useState(null)
	const [visitHour, setVisitHour] = React.useState(null)
	const [data, setData] = React.useState({observacao: ''})
	const [editingTalhao, setEditingTalhao] = React.useState(null)
	const [observacao, setObservacao] = React.useState(null)
	
	const { control, handleSubmit, errors, setValue, reset } = useForm()
	const talhaoEditForm = useForm()
	const talhaoForm = useForm()
	
	const [loading, setLoading] = React.useState(false)
	const [editing, setEditing] = React.useState(false)

	const { id } = useParams()

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const history = useHistory()

	React.useEffect(() => {
		loadData()
	}, [])

	async function loadData() {
		setLoading(true)

		const promises = [carregarMotivosVisita(), carregarDadosVisita()]
		await Promise.all(promises)

		setLoading(false)
	}

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
			setObservacao(resp.observacao)
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
		const { motivos } = form

		const data = new FormData()
		data.set('motivo_visita', motivos.join(', '))
		data.set('horaEstimada', visitHour.toJSON())
		data.set('dia_visita', visitDay.toJSON())
		data.set('status', 'concluido')

		for (const [i, talhao] of Object.entries(talhoes)) {
			const item = `talhoes[${i}]`
			const { imagens, relatorio, cultura } = talhao
			data.set(`${item}[cultura]`, cultura)
			data.set(`${item}[relatorio]`, relatorio)

			for (const [j, img] of Object.entries(imagens))
				data.append(`imagem[${i}][${j}]`, img)
		}

		try {
			setLoading(true)
			
			await api.post(`/visitas/${id}`, data)

			loadData()
			toast.showSuccess('Salvo!')

			setTimeout(history.goBack, 1000)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setEditing(false)
			setLoading(false)
		}	
	}

	async function cancelarVisita() {
		if (!observacao) return toast.showError('Você precisa Informar um motivo de cancelamento no campo de observações')
		const { motivos } = data

		const visitData = new FormData()
		visitData.set('motivo_visita', motivos.join(', '))
		visitData.set('horaEstimada', visitHour.toJSON())
		visitData.set('dia_visita', visitDay.toJSON())
		visitData.set('observacao', observacao)
		visitData.set('status', 'cancelado')

		try {
			setLoading(true)
			
			await api.post(`/visitas/${id}`, visitData)

			loadData()
			toast.showSuccess('Salvo!')

			setTimeout(history.goBack, 1000)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setEditing(false)
			setLoading(false)
		}	

	}

	function confirmCancel(evt) {
		confirmPopup({
			target: evt.currentTarget,
			message: 'Tem certeza que deseja cancelar essa visita?',
			accept() {
				cancelarVisita()
			}
		})
	} 

	function addTalhao(form) {
		setTalhoes([...talhoes, form])
		setModalVisibility(false)
	}

	function editTalhao(form) {
		const indexOfT = talhoes.indexOf(editingTalhao)
		
		const copyOfTalhoes = [...talhoes]
		copyOfTalhoes[indexOfT] = form

		setTalhoes(copyOfTalhoes)
		setEditingTalhao(null)
	}

	const cancelEdit = () => {
		setEditing(false)
		reset()
		Object.entries(data).forEach(([key, value]) => setValue(key, value))
	}

	function confirmEdit(evt) {
		confirmDialog({
			message: 'Você precisará reenviar as imagens se desejar editar as informações desse talhão',
			icon: 'pi pi-exclamation-triangle',
			header: 'ATENÇÃO',
			draggable: false,
			accept() {
				setEditingTalhao(evt.target.value)
			}
		})
	}

	function removeItem() {
		const indexOfT = talhoes.indexOf(editingTalhao)
		const copyOfTalhoes = [...talhoes]

		copyOfTalhoes.splice(indexOfT, 1)

		setTalhoes(copyOfTalhoes)
		setEditingTalhao(null)
	}

	return (
		<ContainerWithTemplate
			loading={loading}
			contentClassName='p-mt-5 p-grid'
			contentContainerClassName='p-d-flex p-ai-start p-flex-wrap p-grid p-col-12'
		>
			<div className='p-p-1 p-col-12 p-lg-8'>
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
							defaultValue={data?data.observacao:''}
							render={({ name, value, onChange }) => (
								<InputContainer name={name} label='Observações'>
									<InputTextarea
										id={name}
										autoResize
										name={name}
										value={value}
										disabled={!editing}
										onChange={evt => {
											onChange(evt.target.value)
											setObservacao(evt.target.value)
										}}
									/>
								</InputContainer>
							)}
						/>
						<InputWrapper type='button' columns={!editing?3:2} gap='10px'>
							{data.status === 'aberto' && (
								!editing? (
									<React.Fragment>
										<Button type='button' onClick={confirmCancel} label='Cancelar Visita'/>
										<Button type='button' onClick={() => setEditing(true)} label='Editar Visita'/>
										<Button label='Concluir Visita'/>
									</React.Fragment>
								):(
									<React.Fragment>
										<Button type='button' onClick={cancelEdit} label='Cancelar'/>
										<Button type='button' onClick={() => setEditing(false)} label='Salvar Alterações'/>
									</React.Fragment>
								)
							)}
						</InputWrapper>
					</form>
				</Block>
			</div>

			<div className='p-p-1 p-col-12 p-lg-4'>
				<Block className='p-p-3 p-fluid'>
					<CardHeader title='Talhões'/>
					<ListBox
						options={talhoes}
						optionLabel='cultura'
						onChange={evt => confirmEdit(evt)}
					/>
					<Button
						type='button'
						className='p-my-3'
						onClick={() => setModalVisibility(true)}
					>Inserir detalhes de um talhão</Button>
				</Block>
			</div>

			{/* Edit Talhao Dialog */}
			<Dialog
				draggable={false}
				style={{width: '50vw'}}
				header='Detalhes do Talhão'
				visible={editingTalhao !== null}
				onHide={() => setEditingTalhao(null)}
				breakpoints={{'960px': '75vw', '640px': '100vw'}}
			>
				<form className='p-fluid' onSubmit={talhaoEditForm.handleSubmit(editTalhao)}>
					<Controller
						name='cultura'
						control={talhaoEditForm.control}
						defaultValue={editingTalhao?.cultura}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Cultura Cultivada'>
								<InputText name={name} value={value} onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}
					/>
					<Controller
						name='relatorio'
						defaultValue={editingTalhao?.relatorio}
						control={talhaoEditForm.control}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Relatório'>
								<InputTextarea autoResize value={value} onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}
					/>
					<Controller 
						name='imagens'
						defaultValue={[]}
						control={talhaoEditForm.control}
						render={({ name, onChange }) => (
							<InputContainer name={name} label='Imagens da Visita'>
								<FileUpload
									auto
									multiple
									name={name}
									customUpload
									accept="image/*"
									maxFileSize={5000000} 
									uploadHandler={evt => onChange(evt.files)}
								/>
							</InputContainer>
						)}
					/>
					<InputWrapper gap='10px' columns={2}>
						<Button type='button' onClick={removeItem} className='p-flex p-jc-center'>Remover</Button>
						<Button className='p-flex p-jc-center'>Salvar</Button>
					</InputWrapper>
				</form>
			</Dialog>
			
			{/* Add Talhao Dialog */}
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
									maxFileSize={5000000}
									invalidFileSizeMessageDetail='Imagem não enviada pois excedeu o tamanho limite de 5MB'
									invalidFileSizeMessageSummary='Imagem muito grande'
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