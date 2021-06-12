import { differenceInMilliseconds } from 'date-fns'
import { useHistory } from 'react-router'
import React from 'react'

import { Button, FullCalendar, Toast } from '~/primereact'
import { getCalendarOptions } from './fullcalendarOptions'
import { ContainerWithTemplate } from '~/pages/templates'
import { api, getToastInstance } from '~/services'
import { CardHeader } from '~/common/components'
import { formatDate, getApiResponseErrors } from '~/utils'
import { CalendarContainer } from './styles'
import { Block } from '~/common/styles'
import { PageNotFound } from '~/pages'
import { store } from '~/store'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

function VisitasMarcadas() {
	const history = useHistory()
	const [events, setEvents] = React.useState([])

	const [logged, setLogged] = React.useState(false)

	const [loading, setLoading] = React.useState(false)

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		const { auth } = store.getState()
		const { token } = auth
		
		updateLogged()
		store.subscribe(updateLogged)
		
		if (!token) return
		carregarVisitasMarcadas()
	}, [])

	async function carregarVisitasMarcadas() {
		const { auth } = store.getState()

		function formatEvent(visit) {
			const colors = {
				concluido: '#268626',
				aberto: '#1474E0',
				cancelado: '#ff0000'
			}
			const {
				id,
				status,
				propriedade,
				dia_visita: data,
				horario_estimado_visita: hora,
			} = visit

			const dateTime = new Date(`${data}T${hora}.000Z`)

			return {
				id,
				title: propriedade,
				start: dateTime,
				end: dateTime,
				backgroundColor: colors[status]
			}
		}
		try {
			setLoading(true)

			const { data } = await api.get(`/visitas/${auth.user.id}`)
			
			const visitEvents = data.map(formatEvent)
			
			setEvents(visitEvents)
		} catch ({ response }) {
			toast.showErrors(getApiResponseErrors(response))
		} finally {
			setLoading(false)
		}
	}

	const dateClick = evt => {
		if (differenceInMilliseconds(evt.date, new Date(formatDate(new Date(), 'yyyy-MM-dd'))) < 0)
			return toast.showWarn('Não é possível agendar uma visita numa data passada!')

		history.push('/visitas/agendar', evt.date.toJSON())
	}
	const eventClick = info => {
		history.push(`/visitas/detalhe/${info.event.id}`)
	}

	function updateLogged() {
		const { auth } = store.getState()
		const { token, user } = auth

		setLogged((token && user))
	}

	if (!logged) return <PageNotFound/>
	
	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5' loading={loading}>
		<Toast ref={toastRef}/>
			<CalendarContainer>
				<Block className='p-p-3 p-fluid'>
					<div className="p-d-flex p-ai-center">
						<CardHeader title='Visitas Marcadas'/>
						<Button 
							icon='fas fa-plus'
							className='p-ml-3'
							tooltip='Agendar Visita'
							tooltipOptions={{ position: 'left' }}
							onClick={() => history.push('/visitas/agendar')}
						/>
					</div>
					{logged && (
						<FullCalendar
							events={events}
							options={{
								...getCalendarOptions(),
								dateClick,
								eventClick
							}}
						/>
					)}
				</Block>
			</CalendarContainer>
		</ContainerWithTemplate>
	)
}

export default VisitasMarcadas