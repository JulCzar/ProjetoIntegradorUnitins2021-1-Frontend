import React from 'react'
import { Divider } from '~/primereact'
export { default as InputContainer } from './InputContainer'
export { default as CardHeader } from './CardHeader'

export const passwordHeader = <h3>Escolha uma senha</h3>
export const passwordFooter = (
	<React.Fragment>
		<Divider />
		<p className="p-mt-2">Sugestões</p>
		<ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
			<li>Pelo menos uma letra minúscula</li>
			<li>Pelo menos uma letra maiúscula</li>
			<li>Pelo menos um número</li>
			<li>Pelo menos 8 caracteres</li>
		</ul>
	</React.Fragment>
)
