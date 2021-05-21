import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Column, DataTable, Divider, InputMask, InputText} from '~/primereact'
import { CardHeader, InputContainer, } from '~/common/components'
import { ManagementTemplate } from '~/pages/templates'
import { InputWrapper } from '~/common/styles'
import { getInvalidClass } from '~/utils'
import Modal from './components/Modal'
import data from './data.json'
import * as validation from '~/config/validations'

function Perfil() {
	const { control, errors, handleSubmit } = useForm()
	const editPropriedadeModal = useForm()
	const novaPropriedadeModal = useForm()

  const [loading, setLoading] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [editingProperty, setEditingProperty] = React.useState(false)
  const [dadosPropriedade, setDadosPropriedade] = React.useState(null)
  const [modalVisibility, setModalVisibility] = React.useState(false)
	const [editingModalVisibility, setEditingModalVisibility] = React.useState(false)

	const editarPerfil = form => {
		console.log(form) // eslint-disable-line
		setLoading(true)

		setTimeout(setLoading, 500, false)
		setTimeout(setEditing, 500, false)
	}

	const editarPropriedade = form => {
		console.log(form) // eslint-disable-line
		setLoading(true)

		setTimeout(setLoading, 500, false)
		setTimeout(setEditingProperty, 500, false)
	}

	const handleEdit = rowData => {
		setEditingModalVisibility(true)
		setDadosPropriedade(rowData)
	}

	return (
		<ManagementTemplate loading={loading} title='Perfil'>
			{/* Dados do Cooperado */}
			<form onSubmit={handleSubmit(editarPerfil)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						defaultValue=''
						control={control}
						rules={validation.nameValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Nome'>
								<InputText
									name={name}
									value={value}
									disabled={!editing} 
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						defaultValue=''
						name='sobrenome'
						control={control}
						rules={validation.lastnameValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Sobrenome'>
								<InputText
									name={name}
									value={value}
									disabled={!editing} 
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<Controller
					name='email'
					defaultValue=''
					control={control}
					rules={validation.emailValidation}
					render={({ name, value, onChange }) => (
						<InputContainer name={name} error={errors[name]} label='Email'>
							<InputText
								name={name}
								value={value}
								disabled={!editing}	
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}
							/>
						</InputContainer>
					)}
				/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='phone'
						defaultValue=''
						control={control}
						rules={validation.phoneValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='Telefone'>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}	
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='cpf'
						defaultValue=''
						control={control}
						rules={validation.cpfValidation}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} error={errors[name]} label='CPF'>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}
								/>
							</InputContainer>
						)}
					/>
				</InputWrapper>
				<InputWrapper columns={2} gap='10px'>
					{!editing && <Button type='button' label='Desativar Perfil'/>}
					{!editing && <Button onClick={() => setEditing(true)} label='Editar Perfil'/>}
					{editing && <Button onClick={() => setEditing(false)} type='button' label='Cancelar'/>}
					{editing && <Button label='Salvar'/>}
				</InputWrapper>
			</form>
			
			<Divider className='p-mt-5'/>
			{/* Lista de Propriedades */}
			<CardHeader title='Propriedades'/>
			<DataTable emptyMessage='Nenhum item encontrado' value={data} className="p-datatable-striped">
				<Column field="nome" header="Nome"/>
				<Column field="localidade" header="Localidade"/>
				<Column
					className='p-d-flex p-jc-center'
					header='Ações'
					body={rowData => (
						<a onClick={() => handleEdit(rowData)}>Detalhes</a>
					)}/>
			</DataTable>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Nova Propriedade'/>
			
			{/* Modal de Edição da Propriedade */}
			<Modal
				onSubmit={editPropriedadeModal.handleSubmit(editarPropriedade)}
				hideModal={() => setEditingModalVisibility(false)}
				control={editPropriedadeModal.control}
				errors={editPropriedadeModal.errors}
				headerName='Dados da Propriedade'
				visible={editingModalVisibility}
				formData={dadosPropriedade}
				editable={editingProperty}
				buttons={
					<InputWrapper columns={2} gap='10px'>
						{!editingProperty && <Button onClick={() => setEditingProperty(true)} label='Editar'/>}
						{editingProperty && <Button label='Salvar'/>}
						<Button type='button' label='Transferir Propriedade'/>
						
					</InputWrapper>
				}
			/>

			{/* Modal de Cadastro de Propriedade */}
			<Modal
				onSubmit={novaPropriedadeModal.handleSubmit(editarPropriedade)}
				hideModal={() => setModalVisibility(false)}
				control={novaPropriedadeModal.control}
				errors={novaPropriedadeModal.errors}
				headerName='Cadastrar Propriedade'
				visible={modalVisibility}
				buttons={<Button label='Cadastrar'/>}
			/>
		</ManagementTemplate>
	)
}

export default Perfil