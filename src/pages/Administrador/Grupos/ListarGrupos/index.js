import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UnChecklist, UnInput } from '~/common/components'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button, Column, DataTable, Dialog } from '~/primereact'
import { AdminTemplate } from '~/template'
import { groupOptions } from '../groupOptions'
import data from './data.json'

function ListarGrupos() {
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const registerFormRef = React.useRef(null)
	const history = useHistory()

	const register = form => {}

	return (
		<AdminTemplate title='Grupos'>
			<DataTable value={data}>
				<Column field="name" header="Nome"/>
				<Column bodyClassName='p-d-flex p-jc-around' headerStyle={{textAlign: 'center'}} header="Ações" body={() => (
					<React.Fragment>
						<Link to='/admin/grupos/editar'>Editar</Link>
						<a>Excluir</a>
					</React.Fragment>
				)}/>
			</DataTable>
			<Button onClick={() => history.push('/admin/grupos/criar')} label='Criar Novo'/>
			<Dialog
				draggable={false}
				header={<h2>Criar Motivo</h2>}
				closable={false}
				className='p-fluid'
				visible={modalVisibility}
				onHide={() => setState(null)}
				breakpoints={{'1300px': '75vw', '640px': '100vw'}}
				style={{width: '40vw'}}>
				<UnForm ref={registerFormRef} onSubmit={register}>
					<UnInput name='nome' label='Nome' required/>
					<UnChecklist name='roles' label='Permissões' options={groupOptions} gap='20px' columns={2} isMulti/>
					<InputWrapper columns={2} gap='10px'>
						<Button onClick={() => history.goBack()} type='cancelar' label='Cancelar'/>
						<Button type='criar' label='Criar'/>
					</InputWrapper>
				</UnForm>
			</Dialog>
		</AdminTemplate>
	)
}

export default ListarGrupos