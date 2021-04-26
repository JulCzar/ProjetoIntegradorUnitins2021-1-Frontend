import React from 'react'
import { CardHeader, UnInputDateTime, UnSelect} from '~/common/components'
import { Card, Container, Content, UnForm} from '~/common/styles'
import { Column, DataTable } from '~/primereact'
import data from './data.json'

const Painel = () => (
    <Container >
			<Content className='p-d-flex p-jc-center p-ai-center layout-content'>
				<Card className='p-fluid' width='1600px'>
          <CardHeader title='Painel de Exibição'/>
          <UnForm>
          <UnInputDateTime name='date' label='Selecione o Dia'/>
            <DataTable value={data} className="p-datatable-striped" paginator rows={10}>
            <Column field="cooperado" header="Cooperado" />
            <Column field="propriedade"  header="Propriedade"  />
            <Column field="tecnico" header="Técnico"/>            
            <Column field="data" header="Data"/>            
            <Column field="hora" header="Hora"/>           
            <Column field="motivoVisita" header="Motivo da Visita"/>
            <Column field="status" header="Status"/>            
            </DataTable>
            </UnForm>
        </Card>
      </Content>
    </Container>
  )

export default Painel