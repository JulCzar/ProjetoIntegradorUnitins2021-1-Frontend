/**
 * 
 * @param {{
 * 	showIf?: boolean | () => void
 * }} item 
 * @returns 
 */
export function filterItems(item) {
	if (item.showIf === undefined) return true
	
	if (typeof item.showIf === 'function')
		return item.showIf()

	return item.showIf
}