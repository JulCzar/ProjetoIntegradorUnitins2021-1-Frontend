import { classNames } from 'primereact/utils'

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
 * @returns {{isValid: boolean, errors: string[]}}
 */
export const verifyPassword = (password, passwordConfirm) => {
	const result = {
		isValid: true,
		errors: []
	}

	/** @param {string} reason */
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

/**
 * @param {string} phoneNumber 
 */
export const getPhoneObject = phoneNumber => {
	const phoneRegex = /\([0-9]{2}\) [0-9]{1} [0-9]{4}-[0-9]{4}/g
	const isAValidNumber = phoneRegex.test(phoneNumber)
	if (!isAValidNumber) return

	const codigo_area = phoneNumber.substr(1, 2)
	const numero = phoneNumber.substr(5)
	
	return { codigo_area, numero }
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
export const getStringNormalized = str => str
	.normalize('NFD')
	.replace(/[^a-zA-Z1-9s]/g, '')

export const getInvalidClass = condition => classNames({ 'p-invalid': condition})

export function getApiResponseErrors(thrownException) {
	const apiResponse = thrownException?.data?.errors
	
	if (!apiResponse) return ['Houve um erro ao processar a requisição']

	return Object.values(apiResponse).flat()
}

export class Color {
	/** @param {number} r  @param {number} g  @param {number} b  @param {number} a */
	constructor(r,g,b,a) {
		if ((a ?? 255) > 255 || (a ?? 255) < 0) a = 255

		for (const [key,value] of Object.entries({ red:r,green:g,blue:b }))
			if (value > 255 || value < 0) throw new Error(`${key} cannot be an value higher than 255 or less than 0`)
		
		this.r = r
		this.g = g
		this.b = b
		this.a = a ?? 255
	}

	getRGB() {
		return `rgba(${this.r}, ${this.g}, ${this.b})`
	}

	getRGBA() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
	}

	getHex() {
		const HEX = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

		const { r,g,b } = this

		const rf = Math.floor(r/16), rl = r%16
		const gf = Math.floor(g/16), gl = g%16
		const bf = Math.floor(b/16), bl = b%16

		const newR = HEX[rf]+HEX[rl]
		const newG = HEX[gf]+HEX[gl]
		const newB = HEX[bf]+HEX[bl]
		
		return `#${newR}${newG}${newB}`
	}

	getHexAlpha() {
		const HEX = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

		const { r,g,b,a } = this

		const newR = HEX[Math.floor(r/16)]+HEX[r%16]
		const newG = HEX[Math.floor(g/16)]+HEX[g%16]
		const newB = HEX[Math.floor(b/16)]+HEX[b%16]
		const newA = HEX[Math.floor(a/16)]+HEX[a%16]
		
		return `#${newR}${newG}${newB}${newA}`
	}
}

export const getRandomColor = () => {
	const random8Bit = () => Math.floor(Math.random() * 256)

	const r = random8Bit()
	const g = random8Bit()
	const b = random8Bit()
	const a = random8Bit()

	return new Color(r,g,b,a)
}