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

export const ChartContainer = styled('div')``

export const DetailsContainer = styled('div')``

export const DetailsWrapper = styled('div')``

export const DetailsTitle = styled('h3')`
	font-size: 1.5rem;
	font-weight: 700;
`