import { CardHeader } from '~/common/components'
import { useHistory } from 'react-router'
import React from 'react'

import { ContainerWithTemplate } from '~/template'
import { options } from './fullcalendarOptions'
import { CalendarContainer } from './styles'
import { FullCalendar } from '~/primereact'
import { Block } from '~/common/styles'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

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