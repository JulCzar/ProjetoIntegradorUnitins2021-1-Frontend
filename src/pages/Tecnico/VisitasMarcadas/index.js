import React from 'react'
import { CardHeader } from '~/common/components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { ContainerWithTemplate } from '~/template'
import { CalendarContainer } from './styles'
import { FullCalendar } from '~/primereact'
import { Block } from '~/common/styles'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import { useHistory } from 'react-router'

const options = {
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	locale: 'pt-br',
	editable: false,
	droppable: false,
	allDaySlot: false,
	businessHours: false,
	initialView: 'dayGridWeek',
	headerToolbar: {
		left: 'today,prev,next',
		center: 'title',
		right: 'dayGridMonth,dayGridWeek,timeGridDay',
	}
}

function VisitasMarcadas() {
	const history = useHistory()
	const calendarRef = React.useRef(null)
	const [events, setEvents] = React.useState([])

	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5'>
			<CalendarContainer>
				<Block className='p-p-3 p-fluid'>
					<CardHeader title='Visitas Marcadas'/>
					<FullCalendar
						ref={calendarRef}
						events={events}
						options={{
							...options,
							dateClick: e => history.push('/tecnico/visitas/agendar')	// eslint-disable-line
						}}
					/>
				</Block>
			</CalendarContainer>
		</ContainerWithTemplate>
	)
}

export default VisitasMarcadas