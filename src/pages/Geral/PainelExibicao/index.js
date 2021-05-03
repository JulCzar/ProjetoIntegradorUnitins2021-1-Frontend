import React from 'react'

import { CardHeader, UnInputDateTime } from '~/common/components'
import { Column, DataTable } from '~/primereact'
import { Block, UnForm} from '~/common/styles'

import Template from '~/template'
import data from './data.json'

const Painel = () => (
    <Template contentClassName='p-fluid p-mt-5'>
			<Block className='p-p-3'>
				<CardHeader title='Painel de Exibição'/>
				<UnForm>
					<UnInputDateTime name='date' label='Selecione o Dia'/>
					<DataTable value={data} className="p-datatable-striped" paginator rows={7}>
						<Column field="cooperado" header="Cooperado" />
						<Column field="propriedade"  header="Propriedade"  />
						<Column field="tecnico" header="Técnico"/>            
						<Column field="data" header="Data"/>            
						<Column field="hora" header="Hora"/>           
						<Column field="motivoVisita" header="Motivo da Visita"/>
						<Column field="status" header="Status"/>            
					</DataTable>
				</UnForm>
			</Block>
		</Template>
  )

export default Painel