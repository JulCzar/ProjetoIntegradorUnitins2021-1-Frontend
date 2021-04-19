import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { InputText, InputMask } from '~/primereact'

const UnInput = ({ name, label, defaultInput, mask, ...rest }) => {
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
			{mask
				?(<InputMask
					id={name}
					mask={mask}
					name={name}
					ref={inputRef}
					defaultValue={defaultValue}
					{...rest}
				/>)
				:(<InputText
					id={name}
					name={name}
					ref={inputRef}
					defaultValue={defaultValue}
					{...rest}
				/>)
			}
		</div>
	)
}

UnInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultInput: PropTypes.string,
	mask: PropTypes.string
}

export default UnInput