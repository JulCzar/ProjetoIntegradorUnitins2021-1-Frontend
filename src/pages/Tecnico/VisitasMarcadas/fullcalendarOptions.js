import ptBr from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export function getCalendarOptions(history) {
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
		},
		dateClick(evt) {
			console.log(evt) // eslint-disable-line
			history.push('/tecnico/visitas/agendar')
		},
		eventClick(evt) {
			console.log(evt) // eslint-disable-line
			history.push('/tecnico/visitas/detalhes')
		}
	}
}