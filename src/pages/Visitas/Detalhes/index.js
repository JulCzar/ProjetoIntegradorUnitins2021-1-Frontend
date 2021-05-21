import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CardHeader, InputContainer } from '~/common/components'
import { Block, InputWrapper } from '~/common/styles'
import { AutoComplete, Button, Calendar, Dropdown, InputText, InputTextarea, Toast } from '~/primereact'
import { getToastInstance } from '~/services'
import { ContainerWithTemplate } from '~/pages/templates'
import { getInvalidClass } from '~/utils'

	const groupOptions = [
		{value: 1, label: 'Motivo 1'},
		{value: 2, label: 'Motivo 2'},
		{value: 3, label: 'Motivo 3'},
		{value: 4, label: 'Motivo 4'},
		{value: 5, label: 'Motivo 5'},
		{value: 6, label: 'Motivo 6'},
	] 

function DetalhesVisita() {
	const [cooperadosFiltrados, setCooperadosFiltrados] = React.useState([])
	const { control, handleSubmit } = useForm()
	const [editing, setEditing] = React.useState(false)

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

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
				<Toast ref={toastRef} />
				<CardHeader title='Detalhes da Visita'/>
				<form onSubmit={handleSubmit(salvar)}>
					<Controller
						name='cooperado'
						control={control}
						defaultValue={'Miguel Teixeira'}
						render={({ name, value }) => (
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
						defaultValue={'Recanto'}
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
							defaultValue={new Date()}
							render={({ name, value }) => (
								<InputContainer name={name} label='Data'>
									<Calendar
										disabled={!editing}
										showIcon={editing}
										id={name}
										name={name}
										value={value}
										mask='99/99/9999'
										minDate={new Date()}
										dateFormat='dd/mm/yy'
									/>
								</InputContainer>
							)}
						/>
						<Controller
							name='horaEstimada'
							control={control}
							defaultValue={new Date()}
							render={({ name, value }) => (
								<InputContainer name={name} label='Hora Estimada'>
									<Calendar
										timeOnly
										id={name}
										name={name}
										mask='99:99'
										value={value}
										showIcon={editing}
										disabled={!editing}
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
									disabled={!editing}
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
						defaultValue=''
						render={({ name, value }) => (
							<InputContainer name={name} label='Observações'>
								<InputTextarea
									disabled={!editing}
									id={name}
									autoResize
									name={name}
									value={value}
									options={groupOptions}
								/>
							</InputContainer>
						)}
					/>
					<InputWrapper type='button' columns={3} gap='10px'>
						<Button type='button' label='Cancelar Visita'/>
						{!editing && <Button type='button' onClick={() => setEditing(true)} label='Editar Visita'/>}
						{editing && <Button label='Salvar'/>}
						<Button type='button' label='Concluir Visita'/>
					</InputWrapper>
				</form>
			</Block>
		</ContainerWithTemplate>
	)
}

export default DetalhesVisita