import React from 'react'
import styled from 'styled-components'
import { Block } from '~/common/styles'

import { ContainerWithTemplate } from '~/pages/templates'

const Link = styled('a').attrs({target: '_blank'})`
	font-weight: ${({weight}) => (weight || 400)};
`

function About() {
	return (
		<ContainerWithTemplate>
			<Block className='p-p-3 p-mt-5'>
				<h1>Sistema de Monitoramento de Visitas (SIMOV)</h1>

				<h2>Sobre o SIMOV</h2>

				<div style={{textAlign: 'justify'}}>O Sistemas de Monitoramento de Visitas (SIMOV) é uma iniciativa da Cooperativa Agroindustrial do Tocantins (<a href="https://www.coapa.com.br/">COAPA</a>) em conjunto com a disciplina Projeto Integrador I da Universidade Estadual do Tocantins (<a href="https://www.unitins.br/nPortal/">UNITINS</a>) e supervisão do Professor Frederico Pires Pinto.</div>

				<hr/>
				<h2>Equipe de Desenvolvimento</h2>

				<ul>
					<li className='p-mt-3'>Equipe de Implementação:</li>
					<ul>
						<li><Link href='https://github.com/JulCzar' weight={700}>Júlio César Barcelo Monteiro - Líder</Link> </li>
						<li><Link href='https://github.com/BrayanMota'>Brayan Nogueira da Costa Mota</Link></li>
						<li><Link href='https://github.com/IagoLeobas'>Iago Batista Antunes Leobas</Link></li>
						<li><Link href='https://github.com/leocs000'>Leonardo Carvalho Silva</Link></li>
						<li><Link href='https://github.com/lucasbarrosz'>Lucas Barros da paz</Link></li>
					</ul>
					<li className='p-mt-3'>Equipe de Infraestrutura:</li>
					<ul>
						<li><Link href='https://github.com/giovannifranco1' weight={700}>Giovanni Franco Rezende - Líder</Link></li>
						<li><Link href='https://github.com/WederTito'>Weder Cardoso Tito</Link></li>
						<li><Link href='https://github.com/LucasJoseds'>Lucas José da Silva</Link></li>
					</ul>
					<li className='p-mt-3'>Equipe de Artística (LOGO e cores do sistema):</li>
					<ul>
						<li><Link href='https://github.com/leocs000'>Leonardo Carvalho Silva</Link></li>
					</ul>
				</ul>
			</Block>
		</ContainerWithTemplate>
	)
}

export default About