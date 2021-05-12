import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button, Dialog, ListBox, Toast} from '~/primereact'
import { getToastInstance } from '~/services'
import { ContainerWithCard } from '~/template'

const Cadastro = () => {
	const toastRef = React.useRef(null)
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [properties, setProperties] = React.useState([])
	const toast = getToastInstance(toastRef)

	const hideModal = () => setModalVisibility(false)
	const showModal = () => setModalVisibility(true)

	function addProperty(form) {
		setProperties([...properties, form])
		hideModal()
	}

	function cadastrar(form) {
		if (!properties.length) return toast.showWarn('É necessário inserir pelo menos uma propriedade')
		console.log({...form, properties}) // eslint-disable-line
	}

	return (
		<ContainerWithCard cardClassName='p-fluid'>
			<Toast ref={toastRef}/>
			<CardHeader title='Cadastro de Cooperado'/>
			<UnForm onSubmit={cadastrar}>
				<InputWrapper columns={2} gap='10px'>
					<UnInput name='name' label='Nome' required/>
					<UnInput name='lastname' label='Sobrenome' required/>
				</InputWrapper>
				<UnInput name='email' label='Email' required/>
				<InputWrapper columns={2} gap='10px'>
					<UnInput name='cpf' mask='999.999.999-99' label='CPF' required/>
					<UnInput name='phone' mask='(99) 9 9999-9999' label='Telefone' required/>
				</InputWrapper>
				<h2>Propriedades</h2>
				{properties.length
					?<ListBox
						className='p-mb-5'
						options={properties}
						optionLabel={opt => opt.nome}/>
					:<h3>É Necessário adicionar pelo menos uma propriedade</h3>
				}
				<InputWrapper columns={2} gap='10px'>
					<Button type='button' label='Adicionar Propriedade' onClick={showModal}/>
					<Button label='Cadastrar'/>
				</InputWrapper>
			</UnForm>
			<Dialog draggable={false} className='p-fluid' header={<h3>Dados da Propriedade</h3>}
				breakpoints={{'960px': '75vw', '640px': '100vw'}}
				visible={modalVisibility}
				onHide={hideModal}>
				<UnForm onSubmit={addProperty}>
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='nome' label='Nome' required/>
						<UnInput name='area' label='Tamanho (hectares)' required/>
					</InputWrapper>
					<UnInput name='localidade' label='Localidade' required/>
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='registro' label='# da Matrícula' required/>
						<UnInput name='grupo' label='Técnico Responsável' required/>
					</InputWrapper>
					<Button type='submit' label='Salvar'/>
				</UnForm>
			</Dialog>
		</ContainerWithCard>
	)
}

export default Cadastro