import React from 'react'
import PropTypes from 'prop-types'

import { AutoComplete } from '~/primereact'

function UnAutoComplete({
	name,
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
		setValue(new Date())
	}, [])
	
	React.useCallback(() => { setInputValue(value) }, [value])

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			getValue: ref => ref.value
		})
	}, [fieldName, registerField])

	return (
		<div className={`p-field ${className}`}>
			<label htmlFor={name}>{label}</label>
			<AutoComplete
				ref={inputRef}
				field={name}
				suggestions={suggestions}
				completeMethod={completeMethod}
				value={inputValue}
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
	label: PropTypes.string,
	defaultInput: PropTypes.string,
	onChange: PropTypes.func,
	completeMethod: PropTypes.func,
	suggestions: PropTypes.arrayOf(value),
	className: PropTypes.string,
	value
}

export default UnAutoComplete