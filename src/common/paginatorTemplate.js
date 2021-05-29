/* eslint-disable react/display-name */
import React from 'react'
import { Dropdown } from '~/primereact'

export const paginatorTemplate = {
	layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
	'RowsPerPageDropdown': options => {
		const dropdownOptions = [
			{ label: 7, value: 7 },
			{ label: 15, value: 15 },
			{ label: 30, value: 30 }
		]

		return (
			<React.Fragment>
				<span className="p-mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items por página: </span>
				<Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body}/>
			</React.Fragment>
		)
	},
	'CurrentPageReport': options => (
		<span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
			{options.first} - {options.last} de {options.totalRecords}
		</span>
	)
}