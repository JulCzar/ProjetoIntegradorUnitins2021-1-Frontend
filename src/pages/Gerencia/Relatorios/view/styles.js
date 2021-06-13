import styled from 'styled-components'
import { Title } from '~/common/styles'

export const TableTitle = styled('h2')`
	font-size: 1.5rem;
`

export const ReportTitle = styled(Title)`
	font-size: 2.25rem;
`

export const Break = styled('div') `
	@media print {
		page-break-before: always !important;
	}
`

export const FABIcon = styled('div')`
	--size: 50px;
	--distance: 10px;
	align-items: center;
	animation: transform 100ms, box-shadow 100ms;
	background: var(--primary-color);
	border-radius: var(--size);
	bottom: var(--size);
	box-shadow: 0 0 2px 2px #0003;
	color: #fff;
	cursor: pointer;
	display: flex;
	justify-content: center;
	height: var(--size);
	position: fixed;
	right: var(--size);
	width: var(--size);
	z-index: 9999;

	:active {
		transform: scale(1.15);
		box-shadow: 0 0 3px 3px #0004;
	}

	:hover {
		transform: scale(1.02);
	}

	@media print {
		display: none;
	}
`

export const ChartContainer = styled('div')``

export const DetailsContainer = styled('div')``

export const DetailsWrapper = styled('div')``

export const DetailsTitle = styled('h3')`
	font-size: 1.5rem;
	font-weight: 700;
`