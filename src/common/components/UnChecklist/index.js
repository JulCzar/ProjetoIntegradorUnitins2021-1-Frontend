import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'
import { Checkbox } from '~/primereact'
import { CardHeader } from '~/common/components'
import { CheckboxLabel, ListOfOptions } from './styles'

function UnChecklist({
	name,
	label,
	onChange = () => {},
	options,
	isMulti = false,
	columns,
	gap,
	className,
	...rest
}) {
	const inputRefs = React.useRef([])
  const [state, setState] = React.useState([])
	const { fieldName, registerField } = useField(name)

	if (!name) throw new Error('O nome do input não pode ficar vazio!')
	if (!options) throw new Error('É necessário informar uma lista de opções para o checklist!')

	React.useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRefs.current,
      getValue: refs => {
				const listOfSelected = refs
					.filter(ref => ref.props.checked)
					.map(ref => ref.props.value)

				return isMulti?listOfSelected:listOfSelected.pop()
			}
		})
	}, [fieldName, registerField])

	const toggleCheck = ({ target }) => {
		if (isMulti) {
			if(state.includes(target.value)) {
				const newState = state.filter(elem => elem !== target.value)
				setState(newState)
				onChange(inputRefs.current)
			}else {
				const newState = [...state, target.value]
				setState(newState)
				onChange(inputRefs.current)
			}
		}else {
			if (!state.includes(target.value))
				setState([target.value])
			else setState([])
			onChange(target)
		}
	}

	return (
		<div className={`p-field ${className}`}>
			<CardHeader title={label}/>
			<ListOfOptions col={columns} gap={gap}>
				{options.map(({label, value}, i) => {
					const name = `${value}-check-${i}` 

					return (
						<div key={value}>
							<Checkbox
								inputId={name}
								ref={ref => inputRefs.current[i] = ref}
								value={value}
								checked={state.includes(value)}
								onChange={toggleCheck}
								{...rest}
							/>
							<CheckboxLabel htmlFor={name}>{label}</CheckboxLabel>
						</div>
					)
				})}
			</ListOfOptions>
		</div>
	)
}


const value = PropTypes.any.isRequired
const label = PropTypes.string.isRequired
const name = PropTypes.string.isRequired
const option = PropTypes.shape({ value, label})

UnChecklist.propTypes = { name, label,
	onChange: PropTypes.func,
	isMulti: PropTypes.bool,
	options: PropTypes.arrayOf(option).isRequired,
	columns: PropTypes.number,
	gap: PropTypes.string,
	className: PropTypes.string
}

export default UnChecklist