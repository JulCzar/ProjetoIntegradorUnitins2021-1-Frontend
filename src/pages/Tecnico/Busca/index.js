import React from 'react'

import { Card, Container, Content, UnForm } from '~/common/styles'
import { CardHeader, UnInput } from '~/common/components'
import { Button, Column, DataTable } from '~/primereact'

import data from './data.json'

function Busca() {

	return (
		<Container>
			<Content className='p-grid p-d-flex p-jc-center p-ai-center'>
				<Card className='p-fluid' width='1000px'>
					<CardHeader title='Buscar Técnico'/>
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