/**
 * @param {string} message 
 * @returns 
 */
export function dateValidate(message) {
	return {
		required: message,
		pattern: {
			value: /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/i,
			message: 'formato de data invalido.'
		}
	}
}

export const emailValidation = {
	required: 'É necessário informar um email para continuar.',
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		message: 'Endereço de email invalido.'
	}
}

export const phoneValidation = {
	required: 'O campo telefone não pode ficar vazio.',
	pattern: {
		value: /^\([0-9]{2}\) [0-9]{1} [0-9]{4}-[0-9]{4}/i,
		message: 'Endereço de telefone invalido.'
	}
}

export const cpfValidation = {
	required: 'O campo cpf não pode ficar vazio.',
	pattern: {
		value: /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/i,
		message: 'cpf em formato invalido.'
	}
}

export const nameValidation = {
	required: 'O campo nome não pode ficar vazio.'
}

export const lastnameValidation = {
	required: 'O campo sobrenome não pode ficar vazio.'
}

export const propertyAreaValidate = {
	required: 'É necessário informar a área da propriedade.'
}

export const propertyLocalValidate = {
	required: 'É necessário informar a localidade da propriedade.'
}

export const propertyIdValidate = {
	required: 'É necessário informar o id da propriedade.'
}

export const registerValidate = {
	required: 'É necessário informar o registro.'
}

export const passwordValidate = {
	required: 'Informe uma senha.',
	minLength: {
		value: 8,
		message: 'A senha precisa ter no mínimo 8 caracteres.'
	}
}

export const passwordConfirmValidate = {
	required: 'Confirme sua senha.'
}

export const selectCooperadoValidate = {
	required: 'Você precisa selecionar um cooperado.'
}

export const selectTecnicoValidate = {
	required: 'Você precisa selecionar um técnico.'
}

export const selectPropertyValidate = {
	required: 'Você precisa selecionar uma Propriedade.'
}

export const selectReasonValidate = {
	required: 'Você precisa selecionar pelo menos um motivo.'
}

export const selectGroupValidate = {
	required: 'Você precisa selecionar um grupo.'
}

export const startRelatorioValidate = dateValidate('Você precisa informar o inicio do relatório.')
export const endRelatorioValidate = dateValidate('Você precisa informar o final do relatório.')
export const dayValidate = dateValidate('Você precisa informar a data.')
export const hourValidate = {
	required: 'Você precisa informar a hora',
	pattern: {
		value: /^[0-9]{2}:[0-9]{2}/i,
		message: 'formato de hora invalido.'
	}
}