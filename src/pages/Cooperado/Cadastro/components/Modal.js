import React from 'react'
import PropTypes from 'prop-types'

import { Controller } from 'react-hook-form'
import { InputWrapper } from '~/common/styles'
import { InputContainer } from '~/common/components'
import { AutoComplete, Button, Dialog, InputNumber, InputText } from '~/primereact'
import * as validation from '~/config/validations'
import { getStringNormalized } from '~/utils'

function Modal({ headerName, hideModal, visible, onSubmit, formData, control, errors, tecnicos }) {
	const [suggestions, setSuggestions] = React.useState([])
	function complete(evt) {
		const queryNormalized = getStringNormalized(evt.query.toLowerCase())	
		const filteredTecnicos = tecnicos.filter(t => {
			const normalizedTecnico = getStringNormalized(t.nome_tecnico.toLowerCase())
			if (normalizedTecnico.includes(queryNormalized)) 
				return true

			return false
		})
		setSuggestions(filteredTecnicos)
	}
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
						name='tamanho_area'
						control={control}
						rules={validation.propertyAreaValidation}
						defaultValue={formData?formData.area:null}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Tamanho'>
							<InputNumber
								min={0.01}
								name={name}
								showButtons
								steps={0.01}
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
						name='matricula'
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
						name='id_tecnico'
						control={control}
						rules={validation.selectTecnicoValidation}
						defaultValue={formData?formData.tecnico:''}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Técnico Responsável'>
							<AutoComplete
								name={name}
								value={value}
								forceSelection
								field='nome_tecnico'
								suggestions={suggestions}
								completeMethod={complete}
								onChange={evt => {
									onChange(evt.value)
									console.log(evt)
								}}
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
	tecnicos: PropTypes.array,
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