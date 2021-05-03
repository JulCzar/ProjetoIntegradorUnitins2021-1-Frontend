import React from 'react'

import { CardHeader, UnInput } from '~/common/components'
import { Button, Column, DataTable } from '~/primereact'
import { InputWrapper, UnForm } from '~/common/styles'

import data from './data.json'
import Template from '~/template'

function Busca() {

	return (
		<Template>	
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
			<InputWrapper>
				<Button label='Criar'/>
			</InputWrapper>
		</Template>
	)
}

export default Busca