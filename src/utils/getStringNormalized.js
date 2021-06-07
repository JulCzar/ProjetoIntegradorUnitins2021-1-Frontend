/** @param {string} str */
function getStringNormalized(str) {
	return str.normalize('NFD').replace(/[^a-zA-Z1-9s]/g, '')
}

export default getStringNormalized