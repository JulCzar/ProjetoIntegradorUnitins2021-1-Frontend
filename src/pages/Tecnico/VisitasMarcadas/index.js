import { CardHeader } from '~/common/components'
import { useHistory } from 'react-router'
import React from 'react'
import fcEvents from './events.json'

import { ContainerWithTemplate } from '~/template'
import { getCalendarOptions } from './fullcalendarOptions'
import { CalendarContainer } from './styles'
import { Button, FullCalendar } from '~/primereact'
import { Block } from '~/common/styles'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'

function VisitasMarcadas() {
	const history = useHistory()
	const [events, setEvents] = React.useState([])

	React.useEffect(() => {
		setEvents(fcEvents)
	}, [])

	return (
		<ContainerWithTemplate contentClassName='p-fluid p-mt-5'>
			<CalendarContainer>
				<Block className='p-p-3 p-fluid'>
					<div className="p-d-flex p-ai-center">
						<CardHeader title='Visitas Marcadas'/>
						<Button 
							icon='fas fa-plus'
							className='p-ml-3'
							tooltip='Agendar Visita'
							tooltipOptions={{ position: 'left' }}
							onClick={() => history.push('/tecnico/visitas/agendar')}
						/>
					</div>
					<FullCalendar
						events={events}
						options={getCalendarOptions(history)}
					/>
				</Block>
			</CalendarContainer>
		</ContainerWithTemplate>
	)
}

export default VisitasMarcadas