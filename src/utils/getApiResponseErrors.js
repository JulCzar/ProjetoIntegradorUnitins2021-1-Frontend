/** @return {string[]} */
function getApiResponseErrors(thrownException, defaultMessage = 'Houve um erro ao processar a requisição') {
	const apiResponse = thrownException?.data?.errors
	
	if (!apiResponse) return [defaultMessage]

	return Object.values(apiResponse).flat()
}

export default getApiResponseErrors