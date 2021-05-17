import React from 'react'
import { Column, DataTable } from '~/primereact'
import data from './data.json'

import { ManagementTemplate } from '~/template'

function Cadastro() {

	return (
		<ManagementTemplate title='Administradores'>
			<DataTable emptyMessage='Nenhum item encontrado' value={data}>
				<Column field="name" header="Name"/>
				<Column
					bodyClassName='p-d-flex p-jc-around'
					headerStyle={{textAlign: 'center'}}
					header="Ações"
					body={() => (
						<a>Detalhes</a>
					)}/>
			</DataTable>
		</ManagementTemplate>
	)
}

export default Cadastro