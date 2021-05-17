import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import { Button, Dialog, InputText } from '~/primereact'
import { InputContainer } from '~/common/components'
import { getInvalidClass } from '~/utils'
import Checklist from './Checklist'

function GroupDialog({
	headerName,
	onSubmit,
	formData,
	visible,
	control,
	options,
	onHide,
	errors
}) {
	return (
		<Dialog
			draggable={false}
			header={<h2>{headerName}</h2>}
			className='p-fluid'
			visible={visible}
			onHide={onHide}
			breakpoints={{'1300px': '75vw', '640px': '100vw'}}
			style={{width: '40vw'}}>
			<form onSubmit={onSubmit}>
				<Controller
					name='nome'
					control={control}
					defaultValue={formData?formData.nome:''}
					rules={{required: 'É Necessário fornecer um nome ao grupo.'}}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Nome' error={errors[name]}>
						<InputText
							name={name}
							value={value}
							className={getInvalidClass(errors[name])}
							onChange={e => onChange(e.target.value)}
						/>
					</InputContainer>
				)} />
				<Controller
					name='permissoes'
					control={control}
					defaultValue={formData?formData.options:[]}
					render={({ value, onChange }) => (
						<Checklist
							options={options}
							onChange={onChange}
							label='Permissões'
							value={value}
						/>
					)}
				/>
				<Button label='Cadastrar'/>
			</form>
		</Dialog>
	)
}

const label = PropTypes.string
const value = PropTypes.oneOfType([PropTypes.string, PropTypes.number]) 
const option = PropTypes.shape({ label, value })

GroupDialog.propTypes = {
	headerName: PropTypes.string,
	visible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onHide: PropTypes.func,
	control: PropTypes.any,
	options: PropTypes.arrayOf(option),
	errors: PropTypes.any,
	formData: PropTypes.shape({
		nome: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.number)
	})
}

export default GroupDialog