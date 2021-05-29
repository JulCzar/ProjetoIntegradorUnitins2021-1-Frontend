import { differenceInCalendarDays } from 'date-fns'
import { CardHeader } from '~/common/components'
import { useHistory } from 'react-router'
import React from 'react'
import fcEvents from './events.json'

import { ContainerWithTemplate } from '~/pages/templates'
import { getCalendarOptions } from './fullcalendarOptions'
import { CalendarContainer } from './styles'
import { Button, FullCalendar, Toast } from '~/primereact'
import { Block } from '~/common/styles'
import { getToastInstance } from '~/services'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

function VisitasMarcadas() {
	const history = useHistory()
	const [events, setEvents] = React.useState([])

	const toastRef = React.useRef(null)
	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		setEvents(fcEvents)
	}, [])

	const dateClick = evt => {
		if (differenceInCalendarDays(evt.date, new Date()) < 0)
			return toast.showWarn('Não é possível agendar uma visita numa data passada!')

		history.push('/visitas/agendar', evt.date.toJSON())
	}
	const eventClick = evt => {
		console.log(evt) // eslint-disable-line
		history.push(`/visitas/detalhe/${evt.id}`)
	}
	
	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5'>
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
					<FullCalendar
						events={events}
						options={{
							...getCalendarOptions(),
							dateClick,
							eventClick
						}}
					/>
				</Block>
			</CalendarContainer>
		</ContainerWithTemplate>
	)
}

export default VisitasMarcadas