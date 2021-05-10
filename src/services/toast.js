import React from 'react'

/**
 * 
 * @param {React.MutableRefObject<any>} toastRef 
 * @returns 
 */
export default function getToastInstance(toastRef) {
	/**
	 * 
	 * @param {'success' | 'info' | 'warn' | 'error'} severity 
	 * @param {string} summary 
	 * @param {string} detail 
	 * @returns {{severity:'success' | 'info' | 'warn' | 'error', summary: string, detail?: string}}
	 */
	const getToastObjectMessage = (severity, summary, detail = '') => {
		const message = {
			severity,
			summary
		}

		if (detail) message.detail = detail

		return message
	}

	/**
	 * 
	 * @param {'success' | 'info' | 'warn' | 'error'} severity 
	 * @returns 
	 */
	const getGeneric = severity => {
		/**
		 * @param {string} summary 
		 * @param {string} detail 
		 */
		const genericMessage = (summary, detail = '') => {
			const message = getToastObjectMessage(severity, summary, detail)
			toastRef.current.show(message)
		}
		
		return genericMessage
	}

	/**
	 * 
	 * @param {'success' | 'info' | 'warn' | 'error'} severity 
	 * @returns 
	 */
	const getMultipleGeneric = severity => {
		/**
		 * @param {string[]} summaries 
		 */
		const genericMessage = summaries => {
			const messages = summaries.map(summary => getToastObjectMessage(severity, summary))
	
			toastRef.current.show(messages)
		}

		return genericMessage
	}

	const showSuccess = getGeneric('success')
	const showInfo = getGeneric('info')
	const showWarn = getGeneric('warn')
	const showError = getGeneric('error')

	const showSuccesses = getMultipleGeneric('success')
	const showInfos = getMultipleGeneric('info')
	const showWarns = getMultipleGeneric('warn')
	const showErrors = getMultipleGeneric('error')

	/**
	 * 
	 * @param {{severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail?: string}[]} summaries 
	 */
	const showMultiple = summaries => {
		toastRef.current.show(summaries)
	}

	const clearAll = () => {
		toastRef.current.clear()
	}

	return {
		showSuccess,
		showInfo,
		showWarn,
		showError,
		showSuccesses,
		showInfos,
		showWarns,
		showErrors,
		showMultiple,
		clearAll
	}
}