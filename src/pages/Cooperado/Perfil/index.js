import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Block, InputWrapper, UnForm } from '~/common/styles'
import { Button, Column, DataTable, Dialog} from '~/primereact'
import { ContainerWithTemplate } from '~/template'
import data from './data.json'

function Perfil() {
  const [editing, setEditing] = React.useState(false)
  const [editingProperty, setEditingProperty] = React.useState(false)
  const [modalVisibility, setModalVisibility] = React.useState(false)

	return (
		<ContainerWithTemplate loading={editing} contentClassName='p-fluid p-mt-5'>
			<Block className='p-p-3'>
				<CardHeader title='Perfil'/>
				<UnForm>
					<InputWrapper columns={2} gap='10px'>
						<UnInput disabled={!editing} name='name' label='Nome'/>
						<UnInput disabled={!editing} name='lastname' label='Sobrenome'/>
					</InputWrapper>
					<UnInput disabled={!editing} name='email' label='Email' />
					<InputWrapper columns={2} gap='10px'>
						<UnInput disabled={!editing} mask='(99) 9 9999-9999' name='phone' label='Telefone'/>
						<UnInput disabled={!editing} mask='999.999.999-99' name='cpf' label='CPF'/>
					</InputWrapper>
				</UnForm>
					<InputWrapper columns={2} gap='10px'>
					<Button type='submit' label='Desativar Perfil'/>
					{!editing
						?<Button onClick={() => setEditing(true)} label='Editar Perfil'/>
						:<Button onClick={() => setEditing(false)} label='Salvar'/>}
				</InputWrapper>
			</Block>   
		
			<Block className="p-p-3 p-mt-5">
				<CardHeader title='Propriedades'/>
				<DataTable value={data} className="p-datatable-striped">
					<Column field="name" header="Nome"/>
					<Column field="location" header="Localidade"/>
					<Column className='p-d-flex p-jc-center' header='Ações' body={() => <a onClick={() => setModalVisibility(true)} >Detalhes</a>}/>
				</DataTable>
				<Button onClick={() => setModalVisibility(true)} label='Nova Propriedade'/>
				<Dialog header={() => <h1>Dados da Propriedade</h1>} className='p-fluid' visible={modalVisibility} onHide={() => setModalVisibility(false)} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}>
					<UnForm>
						<InputWrapper columns={2} gap='10px'>
							<UnInput disabled={!editingProperty} name='nome' label='Nome'/>
							<UnInput disabled={!editingProperty} name='area' label='Tamanho'/>
						</InputWrapper>
						<UnInput disabled={!editingProperty} name='localidade' label='Localidade' />
						<InputWrapper columns={2} gap='10px'>
							<UnInput disabled name='registro' label='# da Matrícula'/>
							<UnInput disabled name='grupo' label='Técnico Responsável'/>
						</InputWrapper>
					</UnForm>
					<InputWrapper columns={2} gap='10px'>
						{!editingProperty
						?<Button onClick={() => setEditingProperty(true)} label='Editar'/>
						:<Button onClick={() => setEditingProperty(false)} label='Salvar'/>}
						<Button label='Transferir Propriedade'/>
					</InputWrapper>
				</Dialog>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Perfil