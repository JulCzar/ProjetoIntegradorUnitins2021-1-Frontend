import React from 'react'

import { CardHeader, UnInput, UnSelect } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button, Column, DataTable, InputText} from '~/primereact'
import data from './data.json'

function Busca() {
	const [groupOptions] = React.useState([
		{label: 'Nome', value: 1},
		{label: 'CPF', value: 2}
	])

	return (
		<Container>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='1000px'>
					<CardHeader title='Buscar Cooperado'/>
					<UnForm>
						<UnInput name='.' placeholder='Pesquisar por nome ou cpf' />
					</UnForm>
					<DataTable value={data} className="p-datatable-striped">
            <Column field="name" header="Nome"/>
            <Column field="code" header="CPF"/>
						<Column header='Ações' body={() => (
							<div className='p-d-flex p-jc-between'>
								<a>Detalhes</a>
                <a>Editar</a>
                <a>Desativar</a>
							</div>
						)}/>
    			</DataTable>
					<Button label='Criar'/>
				</Card>
			</Content>
		</Container>
	)
}

export default Busca