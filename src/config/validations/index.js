/**
 * @param {string} message 
 * @returns 
 */
export function getDateValidation(message) {
	return {
		required: message,
		pattern: {
			value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/i,
			message: 'formato de data invalido.'
		}
	}
}

export const email = {
	required: 'É necessário informar um email para continuar.',
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: 'Endereço de email invalido.'
	}
}

export const phone = {
	required: 'O campo telefone não pode ficar vazio.',
	pattern: {
		value: /^\([0-9]{2}\) [0-9]{1} [0-9]{4}-[0-9]{4}/i,
		message: 'Endereço de telefone invalido.'
	}
}

export const cpf = {
	required: 'O campo cpf não pode ficar vazio.',
	pattern: {
		value: /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/i,
		message: 'cpf em formato invalido.'
	}
}

export const name = {
	required: 'O campo nome não pode ficar vazio.'
}

export const lastname = {
	required: 'O campo sobrenome não pode ficar vazio.'
}

export const propertyArea = {
	required: 'É necessário informar a área da propriedade.'
}

export const propertyLocal = {
	required: 'É necessário informar a localidade da propriedade.'
}

export const propertyId = {
	required: 'É necessário informar o id da propriedade.'
}

export const register = {
	required: 'É necessário informar o registro.'
}

export const password = {
	required: 'Informe uma senha.',
	minLength: {
		value: 8,
		message: 'A senha precisa ter no mínimo 8 caracteres.'
	}
}

export const passwordConfirm = {
	required: 'Confirme sua senha.'
}

export const selectCooperado = {
	required: 'Você precisa selecionar um cooperado.'
}

export const selectTecnico = {
	required: 'Você precisa selecionar um técnico.'
}

export const selectProperty = {
	required: 'Você precisa selecionar uma Propriedade.'
}

export const selectReason = {
	required: 'Você precisa selecionar pelo menos um motivo.'
}

export const selectGroup = {
	required: 'Você precisa selecionar um grupo.'
}

export const startRelatorio = getDateValidation('Você precisa informar o inicio do relatório.')
export const endRelatorio = getDateValidation('Você precisa informar o final do relatório.')
export const day = getDateValidation('Você precisa informar a data.')
export const hour = {
	required: 'Você precisa informar a hora',
	pattern: {
		value: /^[0-9]{2}:[0-9]{2}/i,
		message: 'formato de hora invalido.'
	}
}