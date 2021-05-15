import { CardHeader } from '~/common/components'
import { useHistory } from 'react-router'
import React from 'react'
import fcevents from './events.json'

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
	const [events, setEvents] = React.useState([])
	
	const getFullCalendarOptions = () => ({
		...options,
		dateClick: e => history.push('/tecnico/visitas/agendar'),	// eslint-disable-line
		eventClick: e => history.push('/tecnico/visitas/detalhes')
	})

	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5'>
			<CalendarContainer>
				<Block className='p-p-3 p-fluid'>
					<CardHeader title='Visitas Marcadas'/>
					<FullCalendar
						events={fcevents}
						options={getFullCalendarOptions()}
					/>
				</Block>
			</CalendarContainer>
		</ContainerWithTemplate>
	)
}

export default VisitasMarcadas