import React from 'react'
import { Link } from 'react-router-dom'
import { UnChecklist, UnInput } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button, Column, DataTable, Dialog } from '~/primereact'
import { AdminTemplate } from '~/template'
import { groupOptions } from '../groupOptions'
import data from './data.json'

function ListarGrupos() {
	const [registerModalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)
	const registerFormRef = React.useRef(null)

	const register = form => {}

	return (
		<AdminTemplate title='Grupos'>
			<DataTable emptyMessage='Nenhum item encontrado' value={data}>
				<Column field="name" header="Nome"/>
				<Column bodyClassName='p-d-flex p-jc-around' headerStyle={{textAlign: 'center'}} header="Ações" body={() => (
					<React.Fragment>
						<Link onClick={() => setEditModalVisibility(true)}>Editar</Link>
						<a>Excluir</a>
					</React.Fragment>
				)}/>
			</DataTable>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Criar Novo'/>
			<Dialog
				draggable={false}
				header={<h2>Criar Grupo</h2>}
				closable={false}
				className='p-fluid'
				visible={registerModalVisibility}
				onHide={() => setState(null)}
				breakpoints={{'1300px': '75vw', '640px': '100vw'}}
				style={{width: '40vw'}}>
				<UnForm ref={registerFormRef} onSubmit={register}>
					<UnInput name='nome' label='Nome' required/>
					<UnChecklist name='roles' label='Permissões' options={groupOptions} gap='20px' columns={2} isMulti/>
					<InputWrapper columns={2} gap='10px'>
						<Button type='button' onClick={() => setModalVisibility(false)} label='Cancelar'/>
						<Button label='Criar'/>
					</InputWrapper>
				</UnForm>
			</Dialog>
			<Dialog
				draggable={false}
				header={<h2>Editar Grupo</h2>}
				closable={false}
				className='p-fluid'
				visible={editModalVisibility}
				breakpoints={{'1300px': '75vw', '640px': '100vw'}}
				style={{width: '40vw'}}>
				<UnForm ref={registerFormRef} onSubmit={register}>
					<UnInput name='nome' label='Nome' required/>
					<UnChecklist name='roles' label='Permissões' options={groupOptions} gap='20px' columns={2} isMulti/>
					<InputWrapper columns={2} gap='10px'>
						<Button type='button' onClick={() => setEditModalVisibility(false)} label='Cancelar'/>
						<Button label='Criar'/>
					</InputWrapper>
				</UnForm>
			</Dialog>
		</AdminTemplate>
	)
}

export default ListarGrupos