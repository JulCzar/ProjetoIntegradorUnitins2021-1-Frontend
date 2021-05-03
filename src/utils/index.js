const error = {
	DOESNT_MATCH: 'Senhas não coincidem',
	LETTER_MISSING: 'A senha deve conter pelo menos uma letra',
	NUMBER_MISSING: 'A senha deve conter pelo menos um número',
	NOT_EMPTY: 'A senha não pode conter apenas espaços em branco'
}

const letters = 'abcdefghijklmnopqrstuvwxyz'
const LETTERS = letters.toUpperCase()
const numbers = '0123456789'

/**
 * @param {string[]} alphabet 
 */
const getAlphabetChecker = alphabet => word => alphabet
	.reduce((acc, item) => (word.includes(item)?true:acc), false)

const containLetters = getAlphabetChecker([...letters, ...LETTERS])
const containNumbers = getAlphabetChecker([...numbers])

/**
 * @param {string} password 
 * @param {string} passwordConfirm 
 * @returns 
 */
export const verifyPassword = (password, passwordConfirm) => {
	const result = {
		isValid: true,
		errors: []
	}

	const setPasswordInvalid = reason => {
		result.isValid = false
		result.errors.push(reason)
	}

	const [pass, confPassword] = [password, passwordConfirm].map(i => i.trim())
	
	if (!pass) setPasswordInvalid(error.NOT_EMPTY)
	if (pass !== confPassword) setPasswordInvalid(error.DOESNT_MATCH)
	if (!containLetters(pass)) setPasswordInvalid(error.LETTER_MISSING)
	if (!containNumbers(pass)) setPasswordInvalid(error.NUMBER_MISSING)

	return result
}