import styled from 'styled-components'

export const CalendarContainer = styled('div')`
width: 100vw;
max-width: var(--max-container-width);

@media (max-width: 770px) {
	.fc-button-group {
		display: unset;

		> * {
			width: 100%;
		}
		
		.fc-button {
			border-radius: 0 !important;
			margin: 0 !important;
			display: flex;
			justify-content: center;
		}
	}
}
`