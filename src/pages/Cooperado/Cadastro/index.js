import React from 'react'
import { CardHeader, UnInput, UnSelect } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button, Dialog} from '~/primereact'

const Cadastro = () => {
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [groupOptions] = React.useState([
		{label: 'Recanto', value: 1},
		{label: 'Cargueiros', value: 2},
		{label: 'Brejão', value: 3},
		{label: 'Veredas', value: 4},
		{label: 'Itabinhas', value: 5}
	])

	function cadastrar(form) {}

	return (
		<Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid'>
					<CardHeader title='Cadastro de Cooperado'/>
					<UnForm onSubmit={cadastrar}>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='name' label='Nome' required/>
							<UnInput name='lastname' label='Sobrenome'/>
						</InputWrapper>
						<UnInput name='email' label='Email'/>
						<InputWrapper columns={2} gap='10px'>
							<UnInput name='cpf' mask='999.999.999-99' label='CPF' required/>
							<UnInput name='phone' mask='(99) 9 9999-9999' label='Telefone' required/>
						</InputWrapper>
					</UnForm>
						<Button type='submit' label='Continuar' onClick={() => setModalVisibility(true)}/>
				</Card>
			</Content>
			<Dialog className='p-fluid' visible={modalVisibility} onHide={() => setModalVisibility(false)} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}>
				<CardHeader title='Dados da Propriedade'/>
				<UnForm>
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='nome' label='Nome'/>
						<UnInput name='area' label='Tamanho'/>
					</InputWrapper>
					<UnInput name='localidade' label='Localidade' />
					<InputWrapper columns={2} gap='10px'>
						<UnInput name='registro' label='# da Matrícula'/>
						<UnInput name='grupo' label='Técnico Responsável'/>
					</InputWrapper>
				</UnForm>
					<Button label='Enviar'/>
			</Dialog>
		</Container>
	)
}

export default Cadastro