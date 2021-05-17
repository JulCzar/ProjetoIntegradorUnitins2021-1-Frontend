import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Column, DataTable } from '~/primereact'

import { permissions } from '~/config/permissions'
import { ManagementTemplate } from '~/template'

import data from './data.json'
import GroupDialog from './components/GroupDialog'

function ListarGrupos() {
	const [registerModalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)
	
	const { control, errors, handleSubmit, reset } = useForm()

	const registerGroup = form => {
		console.log(form) // eslint-disable-line
		setModalVisibility(false)
		reset()
	}

	const editGroup = form => {
		console.log(form) // eslint-disable-line

		reset()
	}

	return (
		<ManagementTemplate title='Grupos'>
			{/* Tabela com listagem de grupos */}
			<DataTable emptyMessage='Nenhum item encontrado' value={data}>
				<Column field="name" header="Nome"/>
				<Column bodyClassName='p-d-flex p-jc-around' headerStyle={{textAlign: 'center'}} header="Ações" body={() => (
					<React.Fragment>
						<a onClick={() => setEditModalVisibility(true)}>Editar</a>
						<a>Excluir</a>
					</React.Fragment>
				)}/>
			</DataTable>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Criar Novo'/>

			{/* Modal de Cadastro de grupo */}
			<GroupDialog
				errors={errors}
				control={control}
				options={permissions}
				headerName='Criar Grupo'
				visible={registerModalVisibility}
				onSubmit={handleSubmit(registerGroup)}
				onHide={() => setModalVisibility(false)}
			/>

			{/* Modal de Edição de grupo */}
			<GroupDialog
				errors={errors}
				control={control}
				options={permissions}
				headerName='Editar Grupo'
				visible={editModalVisibility}
				onSubmit={handleSubmit(editGroup)}
				formData={{nome: 'Jose', options: [1,2,3]}}
				onHide={() => setEditModalVisibility(false)}
			/>
		</ManagementTemplate>
	)
}

export default ListarGrupos