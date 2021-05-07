import React from 'react'
import { CardHeader } from '~/common/components'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { FullCalendar } from '~/primereact'
import { Block } from '~/common/styles'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import Template from '~/template'
import { CalendarContainer } from './styles'

const options = {
	plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
	locale: 'pt-br',
	editable: false,
	droppable: false,
	allDaySlot: false,
	businessHours: false,
	initialView: 'timeGridDay',
	headerToolbar: {
		left: 'today,prev,next',
		center: 'title',
		right: 'dayGridMonth,dayGridWeek,timeGridDay',
	},
	dateClick: e =>  {
		console.log(e)	// eslint-disable-line
	}
}

function VisitasMarcadas() {
	const calendarRef = React.useRef(null)
	const [events, setEvents] = React.useState([])

	return (
		<Template contentClassName='p-fluid p-mt-5'>
			<CalendarContainer>
				<Block className='p-p-3 p-fluid'>
					<CardHeader title='Visitas Marcadas'/>
					<FullCalendar initialView='timeGridDay' ref={calendarRef} events={events} options={options}/>
				</Block>
			</CalendarContainer>
		</Template>
	)
}

export default VisitasMarcadas