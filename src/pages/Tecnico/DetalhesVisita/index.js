import React from 'react'
import { CardHeader, UnInput, UnInputDateTime, UnSelect } from '~/common/components'
import UnTextArea from '~/common/components/UnTextArea'
import { Block, Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button, Toast } from '~/primereact'
import { getToastInstance } from '~/services'
import { ContainerWithTemplate } from '~/template'

	const groupOptions = [
		{value: 1, label: 'teste1'},
		{value: 2, label: 'teste2'},
		{value: 3, label: 'teste3'},
		{value: 4, label: 'teste4'},
		{value: 5, label: 'teste5'},
		{value: 6, label: 'teste6'},
	] 

function DetalhesVisita() {
	const [editing, setEditing] = React.useState(false)
	const toastRef = React.useRef(null)
	const formRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	const cooperado = 'Miguel Teixeira'
	const terreno = 'Recanto'

	const submitForm = () => {
		formRef.current.submitForm()
		setEditing(false)
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

	return (
		<ContainerWithTemplate contentClassName='p-mt-5'>
			<Block className='p-p-3 p-fluid'>
				<Toast ref={toastRef} />
				<CardHeader title='Detalhes da Visita'/>
				<UnForm ref={formRef} onSubmit={salvar}>
					<UnInput disabled name='cooperado' label='Cooperado' value={cooperado}/>
					<UnInput disabled name='propriedade' label='Propriedade' value={terreno}/>
					<InputWrapper columns={2} gap='10px'>
						<UnInputDateTime disabled={!editing} name='data' label='Data' dateFormat='dd/mm/yy' mask='99/99/9999' showIcon required/>
						<UnInputDateTime disabled={!editing} timeOnly  name='horaEstimada' label='Hora Estimada' mask='99:99'/>
					</InputWrapper>
					<UnSelect disabled={!editing} value={2} name='motivo' label='Motivo da Visita' options={groupOptions}/>
					<UnTextArea disabled={!editing} name='observacoes' label='Observações' autoResize />
					<InputWrapper type='button' columns={3} gap='10px'>
						<Button type='button' label='Cancelar Visita'/>
						{!editing
							?<Button type='button' onClick={() => setEditing(true)} label='Editar Visita'/>
							:<Button type='button' onClick={submitForm} label='Salvar'/>}
						<Button type='button' label='Concluir Visita'/>
					</InputWrapper>
				</UnForm>
			</Block>
		</ContainerWithTemplate>
	)
}

export default DetalhesVisita