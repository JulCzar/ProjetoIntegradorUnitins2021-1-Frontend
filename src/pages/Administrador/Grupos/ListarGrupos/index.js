import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CardHeader } from '~/common/components'
import { Card, Container, Content } from '~/common/styles'
import { Button, Column, DataTable } from '~/primereact'
import { AdminTemplate } from '~/template'
import data from './data.json'

function ListarGrupos() {
	const history = useHistory()
	return (
		<AdminTemplate title='Grupos'>
			<DataTable value={data}>
				<Column field="name" header="Nome"/>
				<Column bodyClassName='p-d-flex p-jc-around' headerStyle={{textAlign: 'center'}} header="Ações" body={teste => (
					<React.Fragment>
						<Link to='/admin/grupos/editar'>Editar</Link>
						<a>Excluir</a>
					</React.Fragment>
				)}/>
			</DataTable>
			<Button onClick={() => history.push('/admin/grupos/criar')} label='Criar Novo'/>
		</AdminTemplate>
	)
}

export default ListarGrupos