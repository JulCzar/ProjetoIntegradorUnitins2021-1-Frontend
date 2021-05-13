import React from 'react'
import { Column, DataTable } from '~/primereact'
import data from './data.json'

import { AdminTemplate } from '~/template'

function Cadastro() {

	return (
		<AdminTemplate title='Administradores'>
			<DataTable value={data}>
				<Column field="name" header="Name"/>
				<Column
					bodyClassName='p-d-flex p-jc-around'
					headerStyle={{textAlign: 'center'}}
					header="Ações"
					body={() => (
						<a onClick={() => setEditModalVisibility(true)}>Detalhes</a>
					)}/>
			</DataTable>
		</AdminTemplate>
	)
}

export default Cadastro