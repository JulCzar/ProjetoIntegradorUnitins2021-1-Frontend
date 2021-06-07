const phoneRegex = /\([0-9]{2}\) [0-9]{1} [0-9]{4}-[0-9]{4}/g

/** @param {string} phoneNumber */
function getPhoneObject(phoneNumber) {
	const isAValidNumber = phoneRegex.test(phoneNumber)
	if (!isAValidNumber) return

	const codigo_area = phoneNumber.substr(1, 2)
	const numero = phoneNumber.substr(5)
	
	return { codigo_area, numero }
}

export default getPhoneObject