import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, InputMask, InputText, ListBox, Toast} from '~/primereact'
import { InputContainer } from '~/common/components'
import { ManagementTemplate } from '~/template'
import { InputWrapper } from '~/common/styles'
import { getToastInstance } from '~/services'

import * as validation from '~/config/validations'
import { getInvalidClass } from '~/utils'
import Modal from './components/Modal'

const Cadastro = () => {
	const { control, errors, handleSubmit, reset} = useForm()
	const modalForm = useForm()

	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [propriedadeEmEdicao] = React.useState(null)
	const [properties, setProperties] = React.useState([])
	
	const toastRef = React.useRef(null)
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
		reset()
	}

	return (
		<ManagementTemplate title='Cadastro de Cooperado'>
			<Toast ref={toastRef}/>

			<form onSubmit={handleSubmit(cadastrar)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue=''
						control={control}
						rules={validation.nameValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Nome'>
								<InputText
									name={name}
									value={value}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						defaultValue=''
						name='sobrenome'
						control={control}
						rules={validation.lastnameValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Sobrenome'>
								<InputText
									name={name}
									value={value}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<Controller
					name='email'
					defaultValue=''
					control={control}
					rules={validation.emailValidation}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Email'>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='cpf'
						defaultValue=''
						control={control}
						rules={validation.cpfValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='CPF'>
								<InputMask
									name={name}
									value={value}
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='phone'
						defaultValue=''
						control={control}
						rules={validation.phoneValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Telefone'>
								<InputMask
									name={name}
									value={value}
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<h2>Propriedades</h2>
				{properties.length
					?<ListBox
						className='p-mb-5'
						options={properties}
						optionLabel='nome'/>
					:<h3>É Necessário adicionar pelo menos uma propriedade</h3>
				}
				<InputWrapper columns={2} gap='10px'>
					<Button type='button' label='Adicionar Propriedade' onClick={showModal}/>
					<Button label='Cadastrar'/>
				</InputWrapper>
			</form>

			{/* Modal de cadastro da propriedade */}
			<Modal
				hideModal={hideModal}
				errors={modalForm.errors}
				visible={modalVisibility}
				control={modalForm.control}
				formData={propriedadeEmEdicao}
				headerName='Dados da Propriedade'
				onSubmit={modalForm.handleSubmit(addProperty)}
			/>
		</ManagementTemplate>
	)
}

export default Cadastro