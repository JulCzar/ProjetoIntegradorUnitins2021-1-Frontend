import React from 'react'
import { Checkbox } from '~/primereact'
import PropTypes from 'prop-types'
import { ListOfOptions } from '../styles'
import { CardHeader } from '~/common/components'

function Checklist({ options, value, label, onChange = () => {} }) {
	const toggleCheck = ({ target }) => {
		if(value.includes(target.value))
			onChange(value.filter(elem => (elem !== target.value)))
		else
			onChange([...value, target.value])
	}

	const toggleCheckLabel = v => {
		if(value.includes(v))
			onChange(value.filter(elem => (elem !== v)))
		else
			onChange([...value, v])
	}

	return (
		<div className='p-field'>
			<CardHeader title={label} />
			<ListOfOptions col={2}>
				{options.map(o => (
					<div className='p-my-2' key={o.value}>
						<Checkbox
							checked={value.includes(o.value)}
							value={o.value}
							onChange={toggleCheck}/>
						<label onClick={() => toggleCheckLabel(o.value)} className='p-ml-1'>{o.label}</label>
					</div>
				))}
			</ListOfOptions>
		</div>
	)
}
const label = PropTypes.string
const value = PropTypes.oneOfType([PropTypes.string, PropTypes.number]) 
const option = PropTypes.shape({ label, value })

Checklist.propTypes = {
	options: PropTypes.arrayOf(option),
	value: PropTypes.arrayOf(value),
	onChange: PropTypes.func,
	label
}

export default Checklist