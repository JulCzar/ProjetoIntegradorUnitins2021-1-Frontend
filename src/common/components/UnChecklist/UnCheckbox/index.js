import React from 'react'
import { Checkbox } from '~/primereact'
import PropTypes from 'prop-types'
import { CheckboxLabel } from '../styles'
import { useField } from '@unform/core'

function UnCheckbox({ name, label, value, onChange = () => {}, ...rest }) {
	const inputRef = React.useRef(null)
	const [state, setState] = React.useState(null)
	const { fieldName, registerField } = useField(name)

	React.useEffect(() => {
		if (!name) throw new Error('O nome do input não pode ficar vazio!')
	}, [])

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			getValue: ref => (ref.props.checked?value:null)
		})
	}, [fieldName, registerField])

	const toggleCheck = ({ target }) => {
		if (state !== target.value) 
			setState(target.value)
		else setState(null)

		onChange(target)
	}

	return (
		<div className="p-field">
			<div>
				<Checkbox
					inputId={name}
					ref={inputRef}
					value={value}
					checked={state === value}
					onChange={toggleCheck}
					{...rest}
				/>
				<CheckboxLabel htmlFor={name}>{label}</CheckboxLabel>
			</div>
		</div>
	)
}

UnCheckbox.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.any
}

export default UnCheckbox