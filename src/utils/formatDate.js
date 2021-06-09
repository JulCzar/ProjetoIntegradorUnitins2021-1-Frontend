import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/** @param {Date} date @param {string} pattern */
function formatDate(date, pattern) {
	return format(date, pattern, { locale: ptBR })
}

export default formatDate