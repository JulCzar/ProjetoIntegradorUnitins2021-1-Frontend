import ptBr from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export const options = {
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