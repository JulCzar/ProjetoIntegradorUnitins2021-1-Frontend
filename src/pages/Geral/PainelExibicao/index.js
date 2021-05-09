import React from 'react'

import { CardHeader, UnAutoComplete, UnInput, UnInputDateTime, UnSelect } from '~/common/components'
import { Column, DataTable } from '~/primereact'
import { Block, InputWrapper, UnForm} from '~/common/styles'

import data from './data.json'
import { ContainerWithTemplate } from '~/template'

function Painel() {
	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5'>
			<Block className='p-p-3'>
				<CardHeader title='Painel de Exibição'/>
				<UnForm>
					<InputWrapper columns={5} gap='10px'>
						<UnAutoComplete name='nome_cooperado' label='Cooperado'/>
						<UnSelect name='nome_propriedade' label='Propriedade'/>
						<UnInput name='nome_tecnico' label='Tecnico'/>
						<UnSelect name='motivo_visita' label='Motivo da Visita'/>
						<UnInputDateTime name='date' label='Selecione o Dia'/>
					</InputWrapper>
					<DataTable value={data} className="p-datatable-striped" paginator rows={7}>
						<Column field="cooperado" header="Cooperado"/>
						<Column field="propriedade" header="Propriedade"  />
						<Column field="tecnico" header="Técnico"/>            
						<Column field="data" header="Data"/>            
						<Column field="hora" header="Hora"/>           
						<Column field="motivoVisita" header="Motivo da Visita"/>
						<Column field="status" header="Status"/>            
					</DataTable>
				</UnForm>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Painel