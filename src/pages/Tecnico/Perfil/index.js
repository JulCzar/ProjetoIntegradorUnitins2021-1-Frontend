import {  useHistory, useParams } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'

import { Button, confirmPopup, Dialog, Dropdown, InputMask, InputText, Password, Toast} from '~/primereact'
import { getApiResponseErrors, getInvalidClass, getPhoneObject, verifyPassword } from '~/utils'
import { ManagementTemplate } from '~/pages/templates'
import { InputContainer, passwordFooter, passwordHeader } from '~/common/components'
import { api, getToastInstance } from '~/services'
import * as validate from '~/config/validations'
import { InputWrapper } from '~/common/styles'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

function Perfil() {
	const { control, errors, handleSubmit, reset, setValue } = useForm()
	const editPassForm = useForm()

	const [editPassModal, setEditPassModal] = React.useState(false)
	const [permissions, setPermissions] = React.useState([])
  const [editing, setEditing] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [grupos, setGrupos] = React.useState([])
	const [data, setData] = React.useState(null)
	const history = useHistory()
	const { id } = useParams()
	
	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		carregarPerfil()
		carregarGrupos()
		updatePermissions()
		store.subscribe(updatePermissions)
	}, [])

	function updatePermissions() {
		const { auth } = store.getState()
		const { permissions } = auth

		setPermissions(permissions ?? [])
	}
	
	async function carregarPerfil() {
		setLoading(true)
		try {
			const { data } = await api.get(`/tecnico/data/${id}`)

			setData(data)
			if (data.grupo) data.id_grupo = data.grupo.id

			Object.entries(data)
				.forEach(([key, value]) => setValue(key, value))
		} catch (err) {
			history.push('/error')
		} finally {
			setLoading(false)
		}
	}

	async function carregarGrupos() {
		try {
			const { data } = await api.get('/grupos')

			setGrupos(data.map(({id, nome}) => ({label: nome, value: id})))
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		}
	}

	const editarPerfil = async form => {
		setLoading(true)

		const { phone, ...restForm } = form
		const telefone = getPhoneObject(phone)
		
		if (!telefone) {
			setLoading(false)
			return toast.showError('O número de telefone providenciado é inválido')
		}
	
		try {
			await api.put(`/tecnico/${data.id}`, {...restForm, telefone})

			toast.showSuccess('Dados Salvos!')

			reset()
		}catch ({ response }) {
			const hasApiResponse = response?.data?.errors
			const errors = hasApiResponse
				?Object.values(response.data.errors)
				:['Ocorreu um erro ao processar a requisição']
			toast.showInfos(errors)
		}finally {
			setLoading(false)
			setEditing(false)
			carregarPerfil()
		}
	}

	const resetForm = () => {
		reset()

		Object.keys(data).forEach(key => setValue(key, data[key]))

		setEditing(false)
	}

	const confirmDisable = event => {
    confirmPopup({
			target: event.currentTarget,
			message: 'Deseja desativar esse técnico?',
			icon: 'pi pi-exclamation-triangle',
			async accept() {
				setLoading(true)
				try {
					await api.put(`/tecnico/${data.id}/disable`)

					toast.showSuccess('Técnico não possuí mais acesso ao sistema.')
				} catch ({ response }) {
					const hasApiResponse = response?.data?.errors
					toast.showWarns(hasApiResponse?response?.data?.errors:['Houve um erro ao processar a requisição.'])
				} finally {
					carregarPerfil()
					setLoading(false)
				}
			}
    })
	}

	const confirmEnable = event => {
    confirmPopup({
			target: event.currentTarget,
			message: 'Deseja ativar esse técnico?',
			icon: 'pi pi-exclamation-triangle',
			async accept() {
				try {
					await api.put(`/tecnico/${data.id}/enable`, {senha})

					toast.showSuccess('Técnico voltou a poder acessar o sistema.')
				} catch ({ response }) {
					const hasApiResponse = response?.data?.errors
					toast.showWarns(hasApiResponse?response?.data?.errors:['Houve um erro ao processar a requisição.'])
				} finally {
					carregarPerfil()
					setLoading(false)
				}
			}
    })
	}

	async function trocarSenha(form) {
		const { senha, passwordConfirm } = form
		const passwordValidate = verifyPassword(senha, passwordConfirm)

		if (!passwordValidate.isValid)
			return toast.showErrors(passwordValidate.errors)
		
		try {
			await api.put(`/tecnico/${id}/password`, {senha})

			toast.showSuccess('Senha foi Alterada')

			setEditPassModal(false)
			editPassForm.reset()
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		}
	}

	if (!permissions.includes(3)) return <PageNotFound/>

	return (
		<ManagementTemplate loading={loading} title='Perfil'>
			<Toast ref={toastRef}/>
			<form onSubmit={handleSubmit(editarPerfil)}>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='nome'
						control={control}
						rules={validate.name}
						defaultValue={data?data.nome:''}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Nome' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='sobrenome'
						control={control}
						rules={validate.lastname}
						defaultValue={data?data.sobrenome:''}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Sobrenome' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<Controller
					name='email'
					control={control}
					defaultValue={data?data.email:''}
					rules={validate.email}
					render={({ name, value, onChange }) => (
					<InputContainer name={name} label='Email' error={errors[name]}>
						<InputText
							name={name}
							value={value}
							disabled={!editing}
							className={getInvalidClass(errors[name])}
							onChange={evt => onChange(evt.target.value)}/>
					</InputContainer>
				)}/>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='cpf'
						control={control}
						rules={validate.cpf}
						defaultValue={data?data.cpf:''}
						render={({ name, value, onChange }) => (
							<InputContainer name={name} label='CPF' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}	
									mask='999.999.999-99'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}/>
						<Controller
							name='phone'
							control={control}
							rules={validate.phone}
							defaultValue={data?data.phone:''}
							render={({ name, value, onChange }) => (
							<InputContainer name={name} label='Telefone' error={errors[name]}>
								<InputMask
									name={name}
									value={value}
									disabled={!editing}
									mask='(99) 9 9999-9999'
									className={getInvalidClass(errors[name])}
									onChange={evt => onChange(evt.target.value)}/>
							</InputContainer>
						)}/>
				</InputWrapper>
				<InputWrapper columns={2} gap='10px'>
					<Controller
						name='numero_registro'
						control={control}
						rules={validate.register}
						defaultValue={data?data.numero_registro:''}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Número do Conselho' error={errors[name]}>
							<InputText
								name={name}
								value={value}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
					<Controller
						name='id_grupo'
						defaultValue=''
						control={control}
						rules={validate.selectGroup}
						render={({ name, value, onChange }) => (
						<InputContainer name={name} label='Grupo de Usuário' error={errors[name]}>
							<Dropdown
								name={name}
								value={value}
								options={grupos}
								disabled={!editing}
								className={getInvalidClass(errors[name])}
								onChange={evt => onChange(evt.target.value)}/>
						</InputContainer>
					)}/>
				</InputWrapper>
				<InputWrapper columns={editing?2:3} gap='10px'>
					{(!editing && !!data?.status) && <Button type='button' onClick={confirmDisable} label='Desativar Perfil'/>}
					{(!editing && !data?.status) && <Button type='button' onClick={confirmEnable} label='Ativar Perfil'/>}
					{!editing && <Button type='button' onClick={() => setEditPassModal(true)} label='Alterar Senha'/>}
					{!editing && <Button type='button' onClick={() => setEditing(true)} label='Editar Perfil'/>}
					{editing && <Button type='button' onClick={resetForm} label='Cancelar'/>}
					{editing && <Button label='Salvar'/>}
				</InputWrapper>
			</form>
			
			<Dialog
				draggable={false}
				visible={editPassModal}
				header='Alterar a senha'
				style={{width: '350px'}}
				onHide={() => setEditPassModal(false)}
			>
				<form onSubmit={editPassForm.handleSubmit(trocarSenha)} className='p-fluid'>
					<Controller
						name='senha'
						defaultValue=''
						rules={validate.password}
						control={editPassForm.control}
						render={({ name, onChange, value }) => (
							<InputContainer
								name={name}
								label='Nova senha'
								error={editPassForm.errors[name]}>
								<Password
									name={name}
									value={value}
									header={passwordHeader}
									footer={passwordFooter}
									onChange={evt => onChange(evt.target.value)}
									className={getInvalidClass(editPassForm.errors[name])}
								/>
							</InputContainer>
						)}
					/>
					<Controller
						name='passwordConfirm'
						defaultValue=''
						rules={validate.password}
						control={editPassForm.control}
						render={({ name, onChange, value }) => (
							<InputContainer
								name={name}
								label='Confirme a nova senha'
								error={editPassForm.errors[name]}>
								<Password
									name={name}
									value={value}
									feedback={false}
									onChange={evt => onChange(evt.target.value)}
									className={getInvalidClass(editPassForm.errors[name])}
								/>
							</InputContainer>
						)}
					/>
					<Button className='p-mt-3 p-d-flex p-jc-center'>Alterar Senha</Button>
				</form>
			</Dialog>
		</ManagementTemplate>
	)
}

export default Perfil