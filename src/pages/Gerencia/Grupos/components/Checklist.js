import React from 'react'
import { Checkbox } from '~/primereact'
import PropTypes from 'prop-types'
import { ListOfOptions } from '../styles'
import { CardHeader } from '~/common/components'

function Checklist({ options, value, label, onChange = () => {} }) {
	const checkboxesRefs = React.useRef([])

	const toggleCheck = ({ target }) => {
		if(value.includes(target.value))
			onChange(value.filter(elem => (elem !== target.value)))
		else
			onChange([...value, target.value])
	}

	const toggleCheckLabel = evt => {
		const { value: v, disabled } = evt.props

		if (disabled) return

		if(value.includes(v))
			onChange(value.filter(elem => (elem !== v)))
		else
			onChange([...value, v])
	}

	const handleLabelClick = i => toggleCheckLabel(checkboxesRefs.current[i])
	
	return (
		<div className='p-field'>
			<CardHeader title={label} />
			<ListOfOptions col={2}>
				{options.map((o, i) => (
					<div className='p-my-2' key={o.value}>
						<Checkbox
							value={o.value}
							disabled={o.disabled}
							onChange={toggleCheck}
							onClick={toggleCheckLabel}
							checked={value.includes(o.value)}
							ref={ref => checkboxesRefs.current[i] = ref}
						/>
						<label onClick={() => handleLabelClick(i)} className='p-ml-1'>{o.label}</label>
					</div>
				))}
			</ListOfOptions>
		</div>
	)
}
const label = PropTypes.string
const value = PropTypes.oneOfType([PropTypes.string, PropTypes.number])
const disabled = PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
const option = PropTypes.shape({ label, value, disabled })

Checklist.propTypes = {
	options: PropTypes.arrayOf(option),
	value: PropTypes.arrayOf(value),
	onChange: PropTypes.func,
	label
}

export default Checklist