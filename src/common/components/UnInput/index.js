import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { InputText, InputMask, Password } from '~/primereact'

const UnInput = ({ type, name, label, defaultInput, mask, value, className, onChange = () => {}, ...rest }) => {
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
			getValue: ref => (mask||(type==='password')?ref.props.value:ref.value)
		})
	}, [fieldName, registerField])

	return (
		<div className={`p-field ${className}`}>
			<label htmlFor={name}>{label}</label>
			{type==='password'
				?<Password
					id={name}
					name={name}
					ref={inputRef}
					defaultValue={defaultValue}
					value={inputValue}
					onChange={e => {
						onChange(e)
						setValue(value || e.target.value)
					}} {...rest}/>
				:mask
					?(<InputMask
						id={name}
						type={type}
						mask={mask}
						name={name}
						ref={inputRef}
						defaultValue={defaultValue}
						value={inputValue}
						onChange={e => {
							onChange(e)
							setValue(value || e.value)
						}} {...rest}/>)
					:(<InputText
						id={name}
						type={type}
						name={name}
						ref={inputRef}
						onChange={e => {
							onChange(e)
							setValue(value || e.target.value)
						}}
						value={value||inputValue}
						defaultValue={defaultValue}
						{...rest}/>)
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
	className: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.any
}

export default UnInput