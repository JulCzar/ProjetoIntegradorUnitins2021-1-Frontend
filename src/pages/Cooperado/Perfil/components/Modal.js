import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { AutoComplete, Dialog, InputNumber, InputText } from '~/primereact'
import { getInvalidClass, getStringNormalized } from '~/utils'
import * as validate from '~/config/validations'

function Modal({ editable = true, formData, headerName, buttons, visible, control, errors, onSubmit, hideModal, tecnicos }) {
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
						rules={validate.name}
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
						name='tamanho_area'
						control={control}
						rules={validate.propertyArea}
						defaultValue={formData?formData.tamanho_area:null}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Tamanho'>
							<InputNumber
								min={0.01}
								name={name}
								step={0.25}
								showButtons
								value={value}
								mode='decimal'
								suffix=' hectares'
								disabled={!editable}
								maxFractionDigits={2}
								minFractionDigits={2}
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
					rules={validate.propertyLocal}
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
						name='matricula'
						control={control}
						rules={validate.propertyId}
						defaultValue={formData?formData.matricula:''}
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
						rules={validate.selectTecnico}
						defaultValue={formData?formData.tecnico:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Técnico Responsável'>
								<AutoComplete
									name={name}
									value={value}
									forceSelection
									dropdown={editable}
									field='nome_tecnico'
									disabled={!editable}
									suggestions={suggestions}
									completeMethod={complete}
									onChange={evt => onChange(evt.value)}
									className={getInvalidClass(errors[name])}
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
	tecnicos: PropTypes.array,
	control: PropTypes.any,
	errors: PropTypes.any,
	formData: PropTypes.shape({
		nome: PropTypes.string,
		tamanho_area: PropTypes.number,
		localidade: PropTypes.string,
		matricula: PropTypes.string,
		tecnico: PropTypes.shape({
			id: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			]),
			name: PropTypes.string
		})
	})
}

export default Modal