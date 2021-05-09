import React from 'react'
import { CardHeader, UnInput } from '~/common/components'
import { Card, Container, Content, InputWrapper, UnForm } from '~/common/styles'
import { Button, Column, DataTable, Dialog } from '~/primereact'
import { AdminTemplate } from '~/template'
import data from './data.json'

function MotivoVisita() {
	const formRef = React.useRef(null)
	const formRefEdit = React.useRef(null)
	const [state, setState] = React.useState(null)
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)

	return (
		<AdminTemplate title='Motivos de Visita'>
			<DataTable value={data}>
				<Column field="name" header="Name"/>
				<Column headerStyle={{textAlign: 'center'}} header="Ações" body={teste => (
					<div className='p-d-flex p-jc-around'>
						<a onClick={() => {
							setState(teste)
							setEditModalVisibility(true)
						}}>Editar</a>
						<a>Excluir</a>
					</div>
				)}/>
			</DataTable>
			<Button onClick={() => setModalVisibility(true)} label='Criar Novo'/>
			<Dialog
				header={() => <h2>Editar Grupo</h2>}
				draggable={false}
				closable={false}
				className='p-fluid'
				visible={editModalVisibility}
				onHide={() => setState(null)}
				breakpoints={{'1300px': '75vw', '640px': '100vw'}}
				style={{width: '40vw'}}>
				<UnForm ref={formRefEdit} onSubmit={() => {}}>
					<UnInput name='nome' label='Nome' value={state?.name || ''} onChange={props => setState({
						...state, name: props.target.value // eslint-disable-line react/prop-types
					})} required={true}/>
				</UnForm>
				<InputWrapper columns={2} gap='10px'>
					<Button onClick={() => {formRefEdit.current.submitForm()}} label='Salvar'/>
					<Button onClick={() => setEditModalVisibility(false)} label='Cancelar'/>
				</InputWrapper>
			</Dialog>
			<Dialog
				draggable={false}
				header={() => <h2>Criar Grupo</h2> }
				closable={false}
				className='p-fluid'
				visible={modalVisibility}
				onHide={() => setState(null)}
				breakpoints={{'1300px': '75vw', '640px': '100vw'}}
				style={{width: '40vw'}}>
				<UnForm ref={formRef} onSubmit={() => {}}>
					<UnInput name='nome' label='Nome' required={true}/>
				</UnForm>
				<InputWrapper columns={2} gap='10px'>
					<Button onClick={() => {formRef.current.submitForm()}} label='Criar'/>
					<Button onClick={() => setModalVisibility(false)} label='Cancelar'/>
				</InputWrapper>
			</Dialog>
		</AdminTemplate>
	)
}

export default MotivoVisita