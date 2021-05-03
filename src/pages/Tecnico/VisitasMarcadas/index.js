import React from 'react'
import { CardHeader } from '~/common/components'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { Card, Container, Content } from '~/common/styles'
import { FullCalendar } from '~/primereact'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

const options = {
	plugins: [timeGridPlugin, interactionPlugin],
	editable: true,
	header: {
		right: 'dayGridMonth, timeGridWeek, timeGridDay'
	},
	dateClick: e =>  {
		console.log(e)	// eslint-disable-line
	}
}

function VisitasMarcadas() {
	const [events, setEvents] = React.useState([])

	return (
		<Container className='p-d-flex'>
			<Content>
				<Card>
					<CardHeader title='Visitas Marcadas'/>
					<FullCalendar events={events} options={options}/>
				</Card>
			</Content>
		</Container>
	)
}

export default VisitasMarcadas