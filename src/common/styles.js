import styled from 'styled-components'

export const Container = styled('div')`
	background: var(--surface-b);
	min-height: 100vh;
`

export const Content = styled('div')`
	width: 100%;
`

export const Card = styled('div')`
	background: var(--surface-e);
	box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
	border-radius: 4px;
	margin-bottom: 2rem;
	padding: 2rem;
	width: ${props => (props.width?props.width:'auto')};
	-webkit-box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`

export const InputWrapper = styled('div')`
	display: grid;
	grid-template-columns: repeat(${props => (props.columns || 1)}, 1fr);
	gap: ${props => (props.gap || 0)};

	@media (max-width: 750px) {
		grid-template-columns: 1fr;
	}
`

export const Title = styled('h1')`
	font-size: 1.25rem;
	font-weight: 700;
	text-align: center;
`

export const Block = styled('div')`
	background: var(--surface-e);
	border-radius: 4px;

	@media print {
		flex-direction: column;
	}
`