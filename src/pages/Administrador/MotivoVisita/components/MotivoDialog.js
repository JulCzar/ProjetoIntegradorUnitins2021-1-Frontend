import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, InputText } from '~/primereact'
import { Controller } from 'react-hook-form'
import { InputContainer } from '~/common/components'
import { InputWrapper } from '~/common/styles'
import { classNames } from '~/utils'

function MotivoModal({ headerName, visible, hideModal, onSubmit, errors, formData, control }) {
	const getClass = name => classNames({ 'p-invalid': errors[name]})

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
					defaultValue={formData?formData.nome:''}
					control={control}
					rules={{required: 'Insira um nome para o novo motivo.'}}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Nome' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								className={getClass(name)}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}/>
					<Button label='Salvar'/>
			</form>
		</Dialog>
	)
}

MotivoModal.propTypes = {
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

export default MotivoModal