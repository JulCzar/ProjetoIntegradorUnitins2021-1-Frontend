import React from 'react'
import { format } from 'date-fns'

import { CardHeader, UnAutoComplete, UnInput, UnInputDateTime, UnSelect } from '~/common/components'
import { Block, InputWrapper, UnForm} from '~/common/styles'
import { Column, DataTable } from '~/primereact'

import { ContainerWithTemplate } from '~/template'
import { getStringNormalized } from '~/utils'
import cooperados from './cooperados.json'
import { api } from '~/services'

function Painel() {
	const [loading, setLoading] = React.useState(false)
	const [visitas, setVisitas] = React.useState([])
	const [nomeCooperado, setNomeCooperado] = React.useState(null)
	const [idCooperado, setIdCooperado] = React.useState(null)
	const [nomePropriedade, setNomePropriedade] = React.useState(null)
	const [idPropriedade, setDadosPropriedade] = React.useState(null)
	const [nomeTecnico, setNomeTecnico] = React.useState(null)
	const [dataVisita, setDataVisita] = React.useState(null)
	const [motivoVisita, setMotivoVisita] = React.useState(null)
	const [idVisita, setIdVisita] = React.useState(null)
	const [lastTimeoutId, setTimeoutId] = React.useState(0)
	const [cooperadosFiltrados, setCooperadosFiltrados] = React.useState([])

	React.useEffect(() => {
		clearTimeout(lastTimeoutId)
		const getParams = () => {
			const params = {}

			if (idCooperado) params.nome_cooperado = nomeCooperado
			if (idPropriedade) params.nome_propriedade = nomePropriedade
			if (nomeTecnico) params.nome_tecnico = nomeTecnico
			if (dataVisita) params.dia_visita = format(dataVisita, 'yyyy-MM-dd')
			if (idVisita) params.motivo_visita = motivoVisita

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

	const filtrarCooperado = event => {
		const cooperadosFiltrados = cooperados
			.filter(i => {
				const pesquisaNormalizada = getStringNormalized(event.query.toLowerCase())
				const nomeCooperadoNormalizado = getStringNormalized(i.label.toLowerCase())
				return nomeCooperadoNormalizado.startsWith(pesquisaNormalizada)
			})

		setCooperadosFiltrados(cooperadosFiltrados)
	}

	return (
		<ContainerWithTemplate loading={loading} contentClassName='p-fluid p-mt-5'>
			<Block className='p-p-3'>
				<CardHeader title='Painel de Exibição'/>
				<UnForm>
					<InputWrapper columns={5} gap='10px'>
						<UnAutoComplete
							field='label'
							label='Cooperado'
							name='nome_cooperado'
							value={idCooperado}
							suggestions={cooperadosFiltrados}
							completeMethod={filtrarCooperado}
							onSelect={e => setNomeCooperado(e.value.label)}
							onChange={e => setIdCooperado(e.value)}
						/>
						<UnSelect
							name='nome_propriedade'
							value={idPropriedade}
							label='Propriedade'
							options={[{value: 1, label:'Fazenda MacMilliam'}]}
							onChange={e => {
								setDadosPropriedade(e.value)
								setNomePropriedade(e.originalEvent.target.innerText)
							}}
						/>
						<UnInput
							name='nome_tecnico'
							label='Tecnico'
							onChange={e => setNomeTecnico(e.target.value)}
							value={nomeTecnico}
						/>
						<UnSelect
							name='motivo_visita'
							value={idVisita}
							label='Motivo da Visita'
							options={[
								{value:1, label:'Checagem do Solo'},
								{value:2, label:'Vacinação'},
							]}
							onChange={e => {
								setIdVisita(e.value)
								setMotivoVisita(e.originalEvent.target.innerText)
							}}
							showFilterClear
						/>
						<UnInputDateTime
							name='date'
							value={dataVisita}
							dateFormat='dd/mm/yy'
							label='Selecione o Dia'
							onChange={e => setDataVisita(e.value)}
						/>
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