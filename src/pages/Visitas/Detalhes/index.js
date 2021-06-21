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
import { ImagemCultura } from './styles'
import { RAW_URL } from '~/config/HTTP'

const status = Object.freeze({
	COMPLETE: 'concluido',
	CANCELED: 'cancelado',
	ONGOING: 'aberto'
})

function DetalhesVisita() {
	/** @type {[{cultura:string,relatorio:string,imagens:File[]}[], React.Dispatch<React.SetStateAction<{cultura:string,relatorio:string,imagens:File[]}[]>]} */
	const [talhoes, setTalhoes] = React.useState([])
	const [motivosSelecionados, setMotivosSelecionados] = React.useState([])
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [motivos, setMotivos] = React.useState([])
	
	const [visitDay, setVisitDay] = React.useState(null)
	const [visitHour, setVisitHour] = React.useState(null)
	const [data, setData] = React.useState(null)
	const [editingTalhao, setEditingTalhao] = React.useState(null)
	
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
			
			const modifiedData = {
				...resp,
				motivos: resp.motivo_visita.split(',').map(i => i.trim()),
				data: new Date(`${date}T${time}.000Z`),
				talhoes: resp.talhoes.map(t => ({...t, foto_talhao: t.foto_talhao.map(i => ({
					...i,
					imagem: `${RAW_URL}/storage/${i.imagem}`
				}))}))
			}
			
			setVisitDay(modifiedData.data)
			setVisitHour(modifiedData.data)
			setMotivosSelecionados(modifiedData.motivos)
			setData(modifiedData)
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

	async function conclude() {
		const visitData = new FormData()
		visitData.set('motivo_visita', data.motivos.join(', '))
		visitData.set('horaEstimada', visitHour.toJSON())
		visitData.set('dia_visita', visitDay.toJSON())
		visitData.set('status', status.COMPLETE) 

		for (const [i, talhao] of Object.entries(talhoes)) {
			const { imagens, relatorio, cultura } = talhao
			
			const item = `talhoes[${i}]`
			visitData.set(`${item}[cultura]`, cultura)
			visitData.set(`${item}[relatorio]`, relatorio)

			for (const [j, img] of Object.entries(imagens))
				visitData.append(`imagem[${i}][${j}]`, img)
		}

		try {
			setLoading(true)
			
			await api.post(`/visitas/${id}`, visitData)

			loadData()
			toast.showSuccess('Salvo!')
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setEditing(false)
			setLoading(false)
		}	
	}

	async function saveChanges(form) {
		const { motivos } = form

		const data = new FormData()
		data.set('motivo_visita', motivos.join(', '))
		data.set('horaEstimada', visitHour.toJSON())
		data.set('dia_visita', visitDay.toJSON())
		data.set('observacao', form.observacao)
		
		try {
			setLoading(true)
			
			await api.post(`/visitas/${id}`, data)

			carregarDadosVisita()
			toast.showSuccess('Salvo!')
		} catch ({ response }) {
			const errors = getApiResponseErrors(response)
			toast.showErrors(errors)
		} finally {
			setLoading(false)
			setEditing(false)
		}
	}

	async function cancelarVisita() {
		if (!data.observacao) return toast.showError('Você precisa Informar um motivo de cancelamento no campo de observações')
		const { motivos } = data

		const visitData = new FormData()
		visitData.set('status', status.CANCELED)

		try {
			setLoading(true)
			visitData.set('motivo_visita', motivos.join(', '))
			visitData.set('horaEstimada', visitHour.toJSON())
			visitData.set('dia_visita', visitDay.toJSON())
			
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
			<Toast ref={toastRef} />
			<div className='p-p-1 p-col'>
				<Block className='p-p-3 p-fluid'>
					<CardHeader title='Detalhes da Visita'/>
					{!!data && (
						<form onSubmit={handleSubmit(saveChanges)}>
							<InputContainer name='cooperado' label='Cooperado'>
								<InputText
									disabled
									value={data.cooperado ?? ''}/>
							</InputContainer>
							<InputContainer name='propriedade' label='Propriedade'>
								<InputText
									disabled
									value={data.propriedade ?? ''}
								/>
							</InputContainer>
							<InputWrapper columns={2} gap='10px'>
								<Controller
									name='data'
									control={control}
									defaultValue={new Date(data.data)}
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
									defaultValue={new Date(data.data)}
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
								defaultValue={data.motivos}
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
								defaultValue={data.observacao}
								render={({ name, value, onChange }) => (
									<InputContainer name={name} label='Observações'>
										<InputTextarea
											id={name}
											autoResize
											name={name}
											value={value ?? ''}
											disabled={!editing}
											onChange={evt => onChange(evt.target.value)}
										/>
									</InputContainer>
								)}
							/>
							<InputWrapper type='button' columns={!editing?3:2} gap='10px'>
								{data.status === status.ONGOING && (
									<React.Fragment>
										{!editing && (
											<React.Fragment>
												<Button type='button' onClick={confirmCancel} label='Cancelar Visita'/>
												<Button type='button' onClick={() => setEditing(true)} label='Alterar detalhes'/>
												<Button type='button' onClick={conclude} label='Concluir Visita'/>
											</React.Fragment>
										)}
										{editing && (
											<React.Fragment>
												<Button type='button' onClick={cancelEdit} label='Cancelar'/>
												<Button label='Salvar Alterações'/>
											</React.Fragment>
										)}
									</React.Fragment>
								)}
							</InputWrapper>
						</form>)}
				</Block>
			</div>

			{data?.status !== status.ONGOING && 
				!!data?.talhoes?.length && (
					<div className='p-p-1 p-col-12'>
						<Block className='p-p-3 p-fluid'>
							<React.Fragment>
								<h1 className='page-break'>Culturas</h1>
								{data.talhoes.map(i => (
									<div key={JSON.stringify(i)}>
										<h2>{i.cultura}</h2>
										<div>{i.relatorio}</div>
										{i.foto_talhao.map(img => (
											<ImagemCultura key={JSON.stringify(img)} src={img.imagem}/>
										))}
									</div>
								))}
							</React.Fragment>
						</Block>
					</div>
				)}

			{data?.status === status.ONGOING && (
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
			)}

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