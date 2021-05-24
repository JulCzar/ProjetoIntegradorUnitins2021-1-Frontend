import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import { Button, Dialog, InputText } from '~/primereact'
import { InputContainer } from '~/common/components'
import * as validate from '~/config/validations'
import { getInvalidClass } from '~/utils'

function Modal({ headerName, visible, hideModal, onSubmit, errors, formData, control }) {
	return (
		<Dialog
			header={<h2>{headerName}</h2>}
			draggable={false}
			className='p-fluid'
			visible={visible}
			onHide={hideModal}
			breakpoints={{'1300px': '75vw', '640px': '100vw'}}
			style={{width: '40vw'}}>
			<form onSubmit={onSubmit}>
				{formData && (
					<Controller
						name='id'
						control={control}
						defaultValue={formData.id}
						render={({ name, value }) => (
							<input type='hidden' name={name} value={value}/>
						)}
					/>
				)}
				<Controller
					name='nome'
					control={control}
					rules={validate.name}
					defaultValue={formData?formData.nome:''}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Nome' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}/>
					<Button label='Salvar'/>
			</form>
		</Dialog>
	)
}

Modal.propTypes = {
	headerName: PropTypes.string,
	visible: PropTypes.bool,
	hideModal: PropTypes.func,
	onSubmit: PropTypes.func,
	errors: PropTypes.any,
	control: PropTypes.any,
	formData: PropTypes.shape({
		id: PropTypes.number,
		nome: PropTypes.string
	})
}

export default Modal