import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { InputNumber } from '~/primereact'

const UnInputNumber = ({ name, label, className, value, suffix, prefix, steps, onChange = () => {}, ...rest }) => {
	const inputRef = React.useRef(null)
	const [inputValue, setValue] = React.useState(null)
	const { fieldName, defaultValue, registerField } = useField(name)

	React.useEffect(() => {
		if (!name) throw new Error('O nome do input não pode ficar vazio!')
	}, [])

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			getValue: ref => ref.props.value
		})
	}, [fieldName, registerField])

	return (
		<div className={`p-field ${className}`}>
			<label htmlFor={name}>{label}</label>
			<InputNumber
				id={name}
				name={name}
				ref={inputRef}
				value={value||inputValue}
				defaultValue={defaultValue}
				suffix={suffix}
				prefix={prefix}
				steps={steps}
				onChange={e => {
					setValue(e.value)
					onChange(e)
				}}
				{...rest}
			/>
		</div>
	)
}

UnInputNumber.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultInput: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string,
	value: PropTypes.string,
	suffix: PropTypes.string,
	prefix: PropTypes.string,
	steps: PropTypes.number
}

export default UnInputNumber