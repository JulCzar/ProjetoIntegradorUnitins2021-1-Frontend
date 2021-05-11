import React from 'react'
import { format } from 'date-fns'

import { CardHeader } from '~/common/components'
import { Block, InputWrapper, UnForm} from '~/common/styles'
import { Calendar, Column, DataTable, InputText } from '~/primereact'

import { ContainerWithTemplate } from '~/template'
import { api } from '~/services'

function Painel() {
	const [loading, setLoading] = React.useState(false)
	const [visitas, setVisitas] = React.useState([])
	const [nomeCooperado, setNomeCooperado] = React.useState(null)
	const [nomePropriedade, setNomePropriedade] = React.useState(null)
	const [nomeTecnico, setNomeTecnico] = React.useState(null)
	const [dataVisita, setDataVisita] = React.useState(null)
	const [motivoVisita, setMotivoVisita] = React.useState(null)
	const [lastTimeoutId, setTimeoutId] = React.useState(0)

	React.useEffect(() => {
		clearTimeout(lastTimeoutId)

		const getParams = () => {
			const params = {}

			if (nomeCooperado)
				params.nome_cooperado = nomeCooperado
			if (nomePropriedade)
				params.nome_propriedade = nomePropriedade
			if (nomeTecnico)
				params.nome_tecnico = nomeTecnico
			if (dataVisita)
				params.dia_visita = format(dataVisita, 'yyyy-MM-dd')
			if (motivoVisita)
				params.motivo_visita = motivoVisita

			return params
		}
	
		const getVisitas = async () => {
			setLoading(true)
			const params = getParams()
			const config = { params }

			try {
				const { data: result } = await api.get('/painel', config)

				setVisitas(result)
			} catch (err) {}
			finally {
				setLoading(false)
			}
		}

		setTimeoutId(setTimeout(getVisitas, 500))
	},[nomeCooperado, nomePropriedade, nomeTecnico, dataVisita, motivoVisita])

	return (
		<ContainerWithTemplate loading={loading} contentClassName='p-fluid p-mt-5'>
			<Block className='p-p-3'>
				<CardHeader title='Painel de Exibição'/>
				<UnForm>
					<InputWrapper className='p-my-3' columns={5} gap='10px'>
						<InputText value={nomeCooperado} placeholder='Cooperado' onChange={e => setNomeCooperado(e.value)}/>
						<InputText value={nomePropriedade} placeholder='Propriedade' onChange={e => setNomePropriedade(e.value)}/>
						<InputText value={nomeTecnico} placeholder='Tecnico' onChange={e => setNomeTecnico(e.value)}/>
						<InputText value={motivoVisita} placeholder='Motivo da Visita' onChange={e => setMotivoVisita(e.value)}/>
						<Calendar value={dataVisita} dateFormat='dd/mm/yy' placeholder='Selecione o Dia' onChange={e => setDataVisita(e.value)}/>
					</InputWrapper>
					<DataTable value={visitas} className="p-datatable-striped" paginator rows={7}>
						<Column field="nome_cooperado" header="Cooperado"/>
						<Column field="nome_propriedade" header="Propriedade"  />
						<Column field="nome_tecnico" header="Técnico"/>            
						<Column field="dia_visita" header="Data"/>            
						<Column field="horario_estimado_visita" header="Hora"/>           
						<Column field="motivo_visita" header="Motivo da Visita"/>
						<Column field="status" header="Status"/>            
					</DataTable>
				</UnForm>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Painel