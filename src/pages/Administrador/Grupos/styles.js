import styled from 'styled-components'

export const ListOfOptions = styled('div')`
	display: grid;
	gap: ${props => props.gap || 0};
	grid-template-columns: repeat(${props => (props.col || 1)}, 1fr);
`