import ptBr from '@fullcalendar/core/locales/pt-br'
import fc from '@fullcalendar/core' // eslint-disable-line
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export function getCalendarOptions() {
	return {
		plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
		locales: [ptBr],
		locale: 'pt-br',
		editable: false,
		droppable: false,
		allDaySlot: false,
		businessHours: false,
		headerToolbar: {
			left: 'today,prev,next',
			center: 'title',
			right: 'dayGridMonth,dayGridWeek,timeGridDay',
		}
	}
}