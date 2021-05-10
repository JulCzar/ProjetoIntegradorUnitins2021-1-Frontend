import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { Calendar } from '~/primereact'

const UnInputDateTime = ({ name, label, value, className, onChange = () => {}, ...rest }) => {
	const inputRef = React.useRef(null)
	const [inputValue, setValue] = React.useState(null)
	const { fieldName, registerField } = useField(name)

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
			<Calendar
				ref={inputRef}
				value={value||inputValue}
				onChange={e => {
					setValue(e.value)
					onChange(e)
				}}
				{...rest}
			/>
		</div>
	)
}

UnInputDateTime.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultInput: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string,
	value: PropTypes.any
}

export default UnInputDateTime