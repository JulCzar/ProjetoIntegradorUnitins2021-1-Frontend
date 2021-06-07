import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { Button, InputText, InputTextarea, Toast } from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import { useParams } from 'react-router'
import { getApiResponseErrors } from '~/utils'
import { format } from 'date-fns'

function DadosVisita() {
	const [data, setData] = React.useState(null)
	const [loading, setLoading] = React.useState(false)
	const { control, reset, setValue } = useForm()

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)
	
	const { id } = useParams()
	
	React.useEffect(() => {
		loadData()
	}, [])

	async function loadData() {
		try {
			setLoading(true)
			const { data } = await api.get(`/historico/visita/${id}`)
			
			const modifiedData = {
				...data,
				dia_visita: format(new Date(data.dia_visita), 'dd/MM/yyyy'),
				horaEstimada: format(new Date(`${data.dia_visita}T${data.horario_estimado_visita}.000Z`), 'hh:mm')
			}
			setData(modifiedData)

			reset()

			Object.entries(modifiedData).forEach(([k,v]) => setValue(k, v))
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	return (
		<ManagementTemplate title='Detalhes da Visita' loading={loading}>
			<Toast ref={toastRef}/>
			<form>
				<Controller
					name='cooperado'
					control={control}
					defaultValue={data?data.cooperado:''}
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
				)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='dia_visita'
						control={control}
						defaultValue={data?data.dia_visita:''}
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
						defaultValue={data?data.horaEstimada:''}
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
					name='motivo_visita'
					defaultValue=''
					control={control}
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
					defaultValue={data?data.observacao:''}
					render={({ name, value }) => (
						<InputContainer name={name} label='Observações'>
							<InputTextarea
								disabled
								id={name}
								autoResize
								name={name}
								value={value}
							/>
						</InputContainer>
					)}
				/>
				<Button type='button' label='Imprimir'/>
			</form>
		</ManagementTemplate>
	)
}

export default DadosVisita