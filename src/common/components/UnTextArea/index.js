import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { InputTextarea } from '~/primereact'

const UnTextArea = ({ name, label, className, value, onChange = () => {}, ...rest }) => {
	const inputRef = React.useRef(null)
	const [inputValue, setValue] = React.useState('')
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
			<InputTextarea
				id={name}
				name={name}
				ref={inputRef}
				value={value||inputValue}
				defaultValue={defaultValue}
				onChange={e => {
					setValue(e.value)
					onChange(e)
				}}
				{...rest}
			/>
		</div>
	)
}

UnTextArea.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultInput: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string,
	value: PropTypes.string
}

export default UnTextArea