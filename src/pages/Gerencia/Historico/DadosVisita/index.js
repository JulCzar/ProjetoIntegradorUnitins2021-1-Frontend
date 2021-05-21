import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { Button, Calendar, Dropdown, InputText, InputTextarea } from '~/primereact'
import { ManagementTemplate } from '~/pages/templates'

const groupOptions = [
	{value: 1, label: 'Motivo 1'},
	{value: 2, label: 'Motivo 2'},
	{value: 3, label: 'Motivo 3'},
	{value: 4, label: 'Motivo 4'},
	{value: 5, label: 'Motivo 5'},
	{value: 6, label: 'Motivo 6'},
]

function DadosVisita() {
	const { control } = useForm()
	
	const cooperado = 'Miguel Teixeira'
	const terreno = 'Recanto'

	return (
		<ManagementTemplate title='Detalhes da Visita'>
			<form>
				<Controller
					name='cooperado'
					control={control}
					defaultValue={cooperado}
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
					defaultValue={terreno}
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
						name='data'
						control={control}
						defaultValue={new Date()}
						render={({ name, value }) => (
						<InputContainer name={name} label='Data'>
							<Calendar
								disabled
								id={name}
								name={name}
								value={value}
								mask='99/99/9999'
								dateFormat='dd/mm/yy'
							/>
						</InputContainer>
					)}/>
					<Controller
						name='horaEstimada'
						control={control}
						defaultValue={new Date()}
						render={({ name, value }) => (
							<InputContainer name={name} label='Hora Estimada'>
								<Calendar
									disabled
									timeOnly
									id={name}
									name={name}
									mask='99:99'
									value={value}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<Controller
					name='motivo'
					control={control}
					defaultValue={1}
					render={({ name, value }) => (
						<InputContainer name={name} label='Motivo da Visita'>
							<Dropdown
								disabled
								id={name}
								name={name}
								value={value}
								options={groupOptions}
							/>
						</InputContainer>
					)}
				/>
				<Controller
					name='observacoes'
					control={control}
					defaultValue='A visita foi realizada sem problemas'
					render={({ name, value }) => (
						<InputContainer name={name} label='Observações'>
							<InputTextarea
								disabled
								id={name}
								autoResize
								name={name}
								value={value}
								options={groupOptions}
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