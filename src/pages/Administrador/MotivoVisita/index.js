import React from 'react'
import { api, getToastInstance } from '~/services'
import { UnInput } from '~/common/components'
import { ManagementTemplate } from '~/template'
import { InputWrapper, UnForm } from '~/common/styles'
import { Button, Column, DataTable, Dialog, Toast } from '~/primereact'

function MotivoVisita() {
	const formRef = React.useRef(null)
	const toastRef = React.useRef(null)
	const formRefEdit = React.useRef(null)
	const [state, setState] = React.useState(null)
	const [motivos, setMotivos] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [modalVisibility, setModalVisibility] = React.useState(false)
	const [editModalVisibility, setEditModalVisibility] = React.useState(false)

	const toast = getToastInstance(toastRef)

	React.useEffect(() => {
		(async () => {
			setLoading(true)

			try {
				const { data } = await api.get('/motivos')
				
				setMotivos(data.motivos_visita)
			} catch (err) {
				toast.showWarn('Houve um erro ao obter a lista de motivos')
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	return (
		<ManagementTemplate loading={loading} title='Motivos de Visita'>
			<Toast ref={toastRef}/>
			<DataTable emptyMessage='Nenhum item encontrado' value={motivos}>
				<Column field="name" header="Name"/>
				<Column
					bodyClassName='p-d-flex p-jc-around'
					headerStyle={{textAlign: 'center'}}
					header="Ações"
					body={() => (
						<React.Fragment>
							<a onClick={() => setEditModalVisibility(true)}>Editar</a>
							<a>Excluir</a>
						</React.Fragment>
					)}/>
			</DataTable>
			<Button className='p-mt-3' onClick={() => setModalVisibility(true)} label='Criar Novo'/>
			<Dialog
				header={<h2>Editar Motivo</h2>}
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
				header={<h2>Criar Motivo</h2>}
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
		</ManagementTemplate>
	)
}

export default MotivoVisita