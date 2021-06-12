import React from 'react'

import { permissions as registeredPermissions } from '~/config/permissions'
import { ManagementTemplate } from '../templates'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

function Gestao() {
	const [permissions, setPermissions] = React.useState([])
	
	React.useEffect(() => {
		updatePermissions()
		store.subscribe(updatePermissions)
	})
	
	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth
		
		setPermissions(permissions ?? [])
	}

	function hasAnyPermissions() {
		for (const p of registeredPermissions) if (permissions.includes(p.value)) return true
		
		return false
	}

	if (!hasAnyPermissions()) return <PageNotFound/>

	return (
		<ManagementTemplate title='Menu de Gestão'>
			Selecione um item no menu ao lado
		</ManagementTemplate>
	)
}

export default Gestao