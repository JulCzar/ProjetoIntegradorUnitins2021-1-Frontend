import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

const UnInput = ({ name, label, defaultInput, ...rest }) => {
	const inputRef = React.useRef(null)
	const { fieldName, defaultValue, registerField } = useField(name)

	React.useEffect(() => {
		if (!name) throw new Error('O nome do input não pode ficar vazio!')
	}, [])

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			getValue: ref => ref.value
		})
	}, [fieldName, registerField])

	return (
		<div className='p-field'>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				ref={inputRef}
				className='p-inputtext p-component p-filled'
				defaultValue={defaultValue}
				{...rest}
			/>
		</div>
	)
}

UnInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultInput: PropTypes.string
}

export default UnInput