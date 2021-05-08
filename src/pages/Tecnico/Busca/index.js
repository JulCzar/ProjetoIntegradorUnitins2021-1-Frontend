import React from 'react'

import { CardHeader, UnInput } from '~/common/components'
import { Button, Column, DataTable } from '~/primereact'
import { Block, InputWrapper, UnForm } from '~/common/styles'

import data from './data.json'
import { Link } from 'react-router-dom'
import { ContainerWithTemplate } from '~/template'

function Busca() {

	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5'>
			<Block className="p-p-3">
				<CardHeader title='Buscar Técnico'/>
				<UnForm>
					<UnInput name='.' placeholder='Pesquisar por nome ou cpf' />
				</UnForm>
				<DataTable value={data} className="p-datatable-striped">
					<Column field="name" header="Nome"/>
					<Column field="code" header="CPF"/>
					<Column header='Ações'
						bodyClassName='p-d-flex p-jc-around'
						headerClassName='p-d-flex p-jc-center'
						body={() => (
							<React.Fragment>
								<Link to='/tecnico/perfil'>Detalhes</Link>
								<a>Desativar</a>
							</React.Fragment>
						)}
					/>
				</DataTable>
				<InputWrapper>
					<Link to='/cadastrar/tecnico'>
						<Button label='Novo'/>
					</Link>
				</InputWrapper>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Busca