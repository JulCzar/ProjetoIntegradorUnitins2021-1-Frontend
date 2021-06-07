import { classNames } from '~/primereact'

/** @param {boolean} condition */
function getInvalidClass(condition) {
	return classNames({ 'p-invalid': condition})
}

export default getInvalidClass