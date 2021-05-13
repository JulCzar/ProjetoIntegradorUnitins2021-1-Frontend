import styled from 'styled-components'

export const Container = styled('div')`
	background: var(--surface-b);
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	> footer {
		margin-top: auto;
	}
`

export const Header = styled('div')`
	background: var(--surface-a);
	padding: 1rem 1.5rem;

	.title {
		font-family: Raleway;
		font-size: 2rem;
		padding-right: 1.5rem;
		margin: 0;
	}
	.p-tabmenu .p-tabmenu-nav {
		border: none;
	}


	a:hover {
		text-decoration: none;
	}
`

export const HeaderMenu = styled('div')`
	.desktop {
		display: none;
	}

	.p-tabmenu {
		border: none;
	}

	@media (min-width: 750px) {
		.mobile {
			display: none;
		}

		.desktop {
			display: unset;
		}
	}
`

export const ContainerLimiter = styled('div')`
	max-width: var(--max-container-width);
`

export const Content = styled('div')`
	align-items: center;
	display: flex;
	flex-direction: column;
	width: 100%;
`

export const Footer = styled('footer')`
	background: var(--surface-a);
	padding: 1rem 1.5rem;
	margin-top: auto;
	color: #ffffff;
`
