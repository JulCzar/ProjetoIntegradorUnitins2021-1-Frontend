import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { Dialog, InputNumber, InputText } from '~/primereact'
import { getInvalidClass } from '~/utils'
import { nameValidation, propertyAreaValidate, propertyIdValidate, propertyLocalValidate, selectTecnicoValidate } from '~/config/validations'

function Modal({ editable = true, formData, headerName, buttons, visible, control, errors, onSubmit, hideModal }) {
	return (
		<Dialog
			draggable={false}
			header={<h1>{headerName}</h1>} 
			className='p-fluid' 
			visible={visible} 
			onHide={hideModal} 
			breakpoints={{'960px': '75vw', '640px': '100vw'}} 
			style={{width: '50vw'}}>
			<form onSubmit={onSubmit}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue={formData?formData.nome:''}
						control={control}
						rules={nameValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Nome'>
								<InputText
									name={name}
									value={value}
									disabled={!editable}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='area'
						control={control}
						rules={propertyAreaValidate}
						defaultValue={formData?formData.area:null}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Tamanho'>
							<InputNumber
								name={name}
								showButtons
								value={value}
								suffix=' hectares'
								disabled={!editable}
								buttonLayout="horizontal"
								incrementButtonIcon="pi pi-plus"
								decrementButtonIcon="pi pi-minus"
								onChange={evt => onChange(evt.value)}
								className={getInvalidClass(errors[name])}
							/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Controller
					name='localidade'
					control={control}
					rules={propertyLocalValidate}
					defaultValue={formData?formData.localidade:''}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} error={errors[name]} label='Localidade'>
						<InputText
							name={name}
							value={value}
							disabled={!editable}
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.target.value)}
						/>
					</InputContainer>
				)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='registro'
						control={control}
						rules={propertyIdValidate}
						defaultValue={formData?formData.registro:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='# da Matrícula'>
								<InputText
									name={name}
									value={value}
									disabled={!editable}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='tecnico'
						control={control}
						rules={selectTecnicoValidate}
						defaultValue={formData?formData.tecnico:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Técnico Responsável'>
								<InputText
									name={name}
									value={value}
									disabled={!editable}
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				{buttons}
			</form>
		</Dialog>
		
	)
}

Modal.propTypes = {
	headerName: PropTypes.string,
	hideModal: PropTypes.func,
	onSubmit: PropTypes.func,
	visible: PropTypes.bool,
	editable: PropTypes.bool,
	buttons: PropTypes.element,
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