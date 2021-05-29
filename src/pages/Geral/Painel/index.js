/* eslint-disable react/display-name */
import React from 'react'
import { format } from 'date-fns'

import { CardHeader } from '~/common/components'
import { Block, InputWrapper } from '~/common/styles'
import { Button, Calendar, Column, DataTable, InputText } from '~/primereact'

import { ContainerWithTemplate } from '~/pages/templates'
import { api } from '~/services'
import { paginatorTemplate } from '~/common/paginatorTemplate'

function Painel() {
	const blockRef = React.useRef(null)
	const [lastTimeoutId, setTimeoutId] = React.useState(0)
	const [loading, setLoading] = React.useState(false)
	const [visitas, setVisitas] = React.useState([])
	const [nomePropriedade, setNomePropriedade] = React.useState('')
	const [nomeCooperado, setNomeCooperado] = React.useState('')
	const [motivoVisita, setMotivoVisita] = React.useState('')
	const [nomeTecnico, setNomeTecnico] = React.useState('')
	const [dataVisita, setDataVisita] = React.useState('')

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
			
			try {
				const { data: result } = await api.get('/painel', { params: getParams() })

				setVisitas(result)
			} catch (err) {}
			finally {
				setLoading(false)
			}
		}

		setTimeoutId(setTimeout(getVisitas, 500))
	},[nomeCooperado, nomePropriedade, nomeTecnico, dataVisita, motivoVisita])

	const enterFullscreen = () => {
		const isNotFullscreen = !document.fullscreenElement

		if (isNotFullscreen)
			return blockRef.current.requestFullscreen()

		document.exitFullscreen()
	}

	return (
		<ContainerWithTemplate loading={loading} contentClassName='p-fluid p-mt-5'>
			<Block ref={blockRef} className='p-p-3'>
				<div className="p-d-flex p-ai-center">
					<CardHeader title='Painel de Exibição'/>
					<Button
						className='p-ml-3'
						icon='fas fa-expand'
						onClick={enterFullscreen}
						tooltip='Expandir Tela'
						tooltipOptions={{position: 'left'}}
					/>
				</div>
				<InputWrapper className='p-mb-3' columns={5} gap='10px'>
					<InputText value={nomeCooperado} placeholder='Cooperado' onChange={e => setNomeCooperado(e.target.value)}/>
					<InputText value={nomePropriedade} placeholder='Propriedade' onChange={e => setNomePropriedade(e.target.value)}/>
					<InputText value={nomeTecnico} placeholder='Tecnico' onChange={e => setNomeTecnico(e.target.value)}/>
					<InputText value={motivoVisita} placeholder='Motivo da Visita' onChange={e => setMotivoVisita(e.target.value)}/>
					<Calendar value={dataVisita} mask='99/99/9999' placeholder='Selecione o Dia' onChange={e => setDataVisita(e.value)}/>
				</InputWrapper>
				<DataTable
					rows={7}
					paginator
					value={visitas}
					rowsPerPageOptions={[7,15,30]}
					className='p-datatable-striped'
					emptyMessage='Nenhum item encontrado'
					paginatorTemplate={paginatorTemplate}
				>
					<Column field="nome_cooperado" header="Cooperado"/>
					<Column field="nome_propriedade" header="Propriedade"  />
					<Column field="nome_tecnico" header="Técnico"/>            
					<Column field="dia_visita" header="Data"/>            
					<Column field="horario_estimado_visita" header="Hora"/>           
					<Column field="motivo_visita" header="Motivo da Visita"/>
					<Column field="status" header="Status"/>            
				</DataTable>
			</Block>
		</ContainerWithTemplate>
	)
}

export default Painel