import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { Dropdown } from '~/primereact'

const UnSelect = ({ name, label, options, ...rest }) => {
	const selectRef = React.useRef(null)
	const [value, setValue] = React.useState(null)
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

	React.useCallback(() => {

	}, [])

	return (
		<div className='p-field'>
			<label>{label}</label>
			<Dropdown
				ref={selectRef}
				options={options}
				value={value}
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
	}))
}

export default UnSelect