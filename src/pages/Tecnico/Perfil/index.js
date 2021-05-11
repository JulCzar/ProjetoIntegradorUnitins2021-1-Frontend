import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Block, InputWrapper, UnForm } from '~/common/styles'
import { Button} from '~/primereact'
import { ContainerWithTemplate } from '~/template'

function Perfil() {
  const [editing, setEditing] = React.useState(true)
	const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	])

	return (
		<ContainerWithTemplate contentClassName='p-mt-5'>
			<Block className="p-p-3 p-fluid">
				<CardHeader title='Perfil'/>
				<UnForm>
					<InputWrapper columns={2} gap='10px'>
						<UnInput disabled={editing} name='name' label='Nome'/>
						<UnInput disabled={editing} name='lastname' label='Sobrenome'/>
					</InputWrapper>
					<UnInput disabled={editing} name='email' label='Email' />
					<InputWrapper columns={2} gap='10px'>
						<UnInput disabled={editing} mask='(99) 9 9999-9999' name='phone' label='Telefone'/>
						<UnInput disabled={editing} mask='999.999.999-99' name='cpf' label='CPF'/>
					</InputWrapper>		
					<UnInput disabled name='registro' label='# do Registro' />
					<UnInput disabled name='grupo' label='Grupo do Técnico' options={groupOptions}/>
				</UnForm>
				<InputWrapper columns={3} gap='10px'>
					<Button type='submit' label='Desativar Perfil'/>
					<Button type='submit' label='Alterar Senha'/>
					{editing
					?<Button onClick={() => setEditing(false)} label='Editar Perfil'/>
					:<Button onClick={() => setEditing(true)} label='Salvar'/>}
				</InputWrapper>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Perfil