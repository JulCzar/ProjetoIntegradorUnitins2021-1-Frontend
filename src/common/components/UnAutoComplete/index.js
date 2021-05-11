import React from 'react'
import PropTypes from 'prop-types'

import { AutoComplete } from '~/primereact'
import { useField } from '@unform/core'

function UnAutoComplete({
	name,
	field,
	label,
	className,
	onChange = () => {},
	completeMethod = () => {},
	suggestions = [],
	value,
	...rest
}) {
	const inputRef = React.useRef(null)
	const [inputValue, setInputValue] = React.useState(null)
	const { fieldName, registerField } = useField(name)

	React.useEffect(() => {
		if (!name) throw new Error('O nome do input não pode ficar vazio!')
	}, [])
	
	React.useCallback(() => { setInputValue(value) }, [value])

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
			<AutoComplete
				ref={inputRef}
				field={field}
				suggestions={suggestions}
				completeMethod={completeMethod}
				value={value||inputValue}
				onChange={e => {
					setInputValue(e.value)
					onChange(e)
				}}
				{...rest}
			/>
		</div>
	)
}

const value = PropTypes.any

UnAutoComplete.propTypes = {
	name: PropTypes.string.isRequired,
	field: PropTypes.string,
	label: PropTypes.string,
	defaultInput: PropTypes.string,
	onChange: PropTypes.func,
	completeMethod: PropTypes.func,
	suggestions: PropTypes.arrayOf(value),
	className: PropTypes.string,
	value
}

export default UnAutoComplete