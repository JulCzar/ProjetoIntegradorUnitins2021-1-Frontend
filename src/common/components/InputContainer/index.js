import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '~/primereact'

function InputContainer({ name, label, children, error }) {	
	return (
		<div className='p-field'>
			<label htmlFor={name} className={classNames({'p-error': error})}>{label}</label>
			{children}
			{error && <small className="p-error">{error.message}</small>}
		</div>
	)
}

InputContainer.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	children: PropTypes.any,
	error: PropTypes.shape({ message: PropTypes.string })
}

export default InputContainer