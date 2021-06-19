import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import React from 'react'

import { Button, InputText, InputTextarea, Toast } from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { InputContainer } from '~/common/components'
import { api, getToastInstance } from '~/services'
import { getApiResponseErrors } from '~/utils'
import { InputWrapper } from '~/common/styles'
import { PageNotFound } from '~/pages'
import { format } from 'date-fns'
import { store } from '~/store'
import { RAW_URL } from '~/config/HTTP'
import { ImagemCultura } from './styles'

function DadosVisita() {
	/**
	 * @type {[{
	 * 	cooperado: string,
	 * 	dia_visita: string,
	 * 	horario_estimado_visita: string,
	 * 	motivo_visita: string,
	 * 	observacao: string | null,
	 * 	propriedade: string,
	 * 	talhoes: {
	 * 		cultura:string,
	 * 		relatorio: string,
	 * 		foto_talhao: {imagem: string}[]
	 * 	}[]
	 * }, React.Dispatch<React.SetStateAction<{
	 * 	cooperado: string,
	 * 	dia_visita: string,
	 * 	horario_estimado_visita: string,
	 * 	motivo_visita: string,
	 * 	observacao: string | null,
	 * 	propriedade: string,
	 * 	talhoes: {
	 * 		cultura:string,
	 * 		relatorio: string,
	 * 		foto_talhao: {imagem: string}[]
	 * 	}[]
	 * }>>]}
	 */
	const [data, setData] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const { control } = useForm()
	const [permissions, setPermissions] = React.useState([])

	const toastRef = React.useRef(null)
	const formRef = React.useRef(null)
	const toast = getToastInstance(toastRef)
	
	const { id } = useParams()
	
	React.useEffect(() => {
		loadData()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	async function loadData() {
		try {
			setLoading(true)
			const { data } = await api.get(`/historico/visita/${id}`)
			
			const modifiedData = {
				...data,
				dia_visita: format(new Date(data.dia_visita), 'dd/MM/yyyy'),
				horaEstimada: format(new Date(`${data.dia_visita}T${data.horario_estimado_visita}.000Z`), 'hh:mm'),
				talhoes: data.talhoes.map(t => ({...t, foto_talhao: t.foto_talhao.map(i => ({
					...i,
					imagem: `${RAW_URL}/storage/${i.imagem}`
				}))}))
			}
			
			setData(modifiedData)
			// reset()

			// Object.entries(modifiedData).forEach(([k,v]) => setValue(k, v))
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}

	function printRegistry() {
		print(formRef.current)
	}

	if (!permissions.includes(1)) return <PageNotFound/>

	return (
		<ManagementTemplate title='Detalhes da Visita' loading={loading}>
		{!!data && (
			<form ref={formRef}>
				<Toast ref={toastRef}/>
				<Controller
					name='cooperado'
					control={control}
					defaultValue={data.cooperado}
					render={({ name, value }) => (
					<InputContainer name={name} label='Cooperado'>
						<InputText
							disabled
							id={name}
							name={name}
							value={value}
						/>
					</InputContainer>
				)}/>
				<Controller
					name='propriedade'
					control={control}
					defaultValue={data.propriedade}
					render={({ name, value }) => (
					<InputContainer name={name} label='Propriedade'>
						<InputText
							disabled
							id={name}
							name={name}
							value={value}
						/>
					</InputContainer>
				)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='dia_visita'
						control={control}
						defaultValue={data.dia_visita}
						render={({ name, value }) => (
						<InputContainer name={name} label='Data'>
							<InputText
								disabled
								id={name}
								name={name}
								value={value}
							/>
						</InputContainer>
					)}/>
					<Controller
						name='horaEstimada'
						control={control}
						defaultValue={data.horaEstimada}
						render={({ name, value }) => (
							<InputContainer name={name} label='Hora Estimada'>
								<InputText
									disabled
									id={name}
									name={name}
									value={value}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<Controller
					control={control}
					name='motivo_visita'
					defaultValue={data.motivo_visita}
					render={({ name, value }) => (
						<InputContainer name={name} label='Motivo da Visita'>
							<InputText
								disabled
								id={name}
								name={name}
								value={value}
							/>
						</InputContainer>
					)}
				/>
				<Controller
					name='observacao'
					control={control}
					defaultValue={data.observacao}
					render={({ name, value }) => (
						<InputContainer name={name} label='Observações'>
							<InputTextarea
								disabled
								id={name}
								autoResize
								name={name}
								value={value ?? ''}
							/>
						</InputContainer>
					)}
				/>
				<Button className='hide-on-print' type='button' onClick={printRegistry} label='Imprimir'/>
			</form>)}
			<div>
				{!!data?.talhoes?.length && (
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
				)}
			</div>
		</ManagementTemplate>
	)
}

export default DadosVisita