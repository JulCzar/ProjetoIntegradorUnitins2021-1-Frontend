import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { InputText, InputMask } from '~/primereact'

const UnInput = ({ name, label, defaultInput, mask, className, onChange = () => {}, ...rest }) => {
	const inputRef = React.useRef(null)
	const [value, setValue] = React.useState(null)
	const { fieldName, defaultValue, registerField } = useField(name)

	React.useEffect(() => {
		if (!name) throw new Error('O nome do input não pode ficar vazio!')
	}, [])

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			getValue: ref => (mask?ref.props.value:ref.value)
		})
	}, [fieldName, registerField])

	return (
		<div className={`p-field ${className}`}>
			<label htmlFor={name}>{label}</label>
			{mask
				?(<InputMask
					id={name}
					mask={mask}
					name={name}
					ref={inputRef}
					defaultValue={defaultValue}
					value={value}
					onChange={i => {
						onChange(i)
						setValue(i.value)
					}}
					{...rest}
				/>)
				:(<InputText
					id={name}
					name={name}
					ref={inputRef}
					onChange={onChange}
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
	mask: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string
}

export default UnInput