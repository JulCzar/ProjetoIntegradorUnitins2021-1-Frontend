/** @return {string[]} */
function getApiResponseErrors(thrownException) {
	const apiResponse = thrownException?.data?.errors
	
	if (!apiResponse) return ['Houve um erro ao processar a requisição']

	return Object.values(apiResponse).flat()
}

export default getApiResponseErrors