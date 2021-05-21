import React from 'react'
import PropTypes from 'prop-types'

import { Controller } from 'react-hook-form'
import { InputWrapper } from '~/common/styles'
import { InputContainer } from '~/common/components'
import { Button, Dialog, InputNumber, InputText } from '~/primereact'
import * as validation from '~/config/validations'

function Modal({ headerName, hideModal, visible, onSubmit, formData, control, errors }) {
	return (
		<Dialog draggable={false} className='p-fluid' header={<h3>{headerName}</h3>}
			breakpoints={{'960px': '75vw', '640px': '100vw'}}
			visible={visible}
			onHide={hideModal}>
			<form onSubmit={onSubmit}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						control={control}
						rules={validation.nameValidation}
						defaultValue={formData?formData.nome:''}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Nome'>
							<InputText
								name={name}
								value={value}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}/>
					<Controller
						name='area'
						control={control}
						rules={validation.propertyAreaValidation}
						defaultValue={formData?formData.area:null}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Tamanho'>
							<InputNumber
								name={name}
								showButtons
								value={value}
								suffix=' hectares'
								buttonLayout='horizontal'
								incrementButtonIcon="pi pi-plus"
								decrementButtonIcon="pi pi-minus"
								onChange={evt => onChange(evt.value)}
							/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Controller
					name='localidade'
					control={control}
					rules={validation.propertyLocalValidation}
					defaultValue={formData?formData.localidade:''}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Localidade'>
							<InputText
								name={name}
								value={value}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='registro'
						control={control}
						rules={validation.propertyIdValidation}
						defaultValue={formData?formData.registro:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='# da Matrícula'>
								<InputText
									name={name}
									value={value}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='tecnico'
						control={control}
						rules={validation.selectTecnicoValidation}
						defaultValue={formData?formData.tecnico:''}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Técnico Responsável'>
							<InputText
								name={name}
								value={value}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Button type='submit' label='Salvar'/>
			</form>
		</Dialog>
	)
}

Modal.propTypes = {
	headerName: PropTypes.string,
	hideModal: PropTypes.func,
	onSubmit: PropTypes.func,
	visible: PropTypes.bool,
	control: PropTypes.any,
	errors: PropTypes.any,
	formData: PropTypes.shape({
		nome: PropTypes.string,
		area: PropTypes.number,
		localidade: PropTypes.string,
		registro: PropTypes.string,
		tecnico: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	})
}

export default Modal