import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { Dropdown, Toast } from '~/primereact'

const UnSelect = ({ name, label, options, className, value, isMulti, ...rest }) => {
	const toast = React.useRef(null)
	const selectRef = React.useRef(null)
	const [selectValue, setValue] = React.useState(null)
	const { fieldName, registerField } = useField(name)

	React.useEffect(() => {
		if (!name) throw new Error('O nome do select não pode ficar vazio!')
	}, [])

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: selectRef.current,
			getValue: ref => ref.props.value
		})
	},[fieldName, registerField])

	return (
		<div className={`p-field ${className}`}>
			<Toast ref={toast}/>
			<label>{label}</label>
			<Dropdown
				ref={selectRef}
				options={options}
				value={value||selectValue}
				onChange={s => setValue(s.value)}
				{...rest}
			/>
		</div>
	)
}

UnSelect.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		label: PropTypes.string
	})),
	className: PropTypes.string,
	value: PropTypes.any,
	isMulti: PropTypes.bool
}

export default UnSelect