import React, { useEffect, useState } from 'react'
import { AutocompleteInput, Create, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'

const ItemCreate = (props) => {
	if (!isModifyPermission()) {
		return null
	}

	const [redirectTo, setRedirectTo] = useState('list')
	const redirect = useRedirect()
	const notify = useNotify()
	const resource = useResourceContext()

	const [boxes, setBoxes] = useState({ loading: true, data: [] })
	const [itemsType, setItemsType] = useState({ loading: true, data: [] })
	const [inks, setInks] = useState({ loading: true, data: [] })

	const fetchBoxes = () => restClient.getList('box-list-only', { pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' } })
	const fetchItemTypes = () => restClient.getList('item-type-list-only', { pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' } })
	const fetchInks = () => restClient.getList('ink-list-only', { pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' } })

	useEffect(() => {
		fetchBoxes().then(({ data }) => {
			setBoxes({ loading: false, data: data.map(b => ({ id: b.id, name: b.name })) })
		}).catch(err => console.log('Error fetching boxes', err))

		fetchItemTypes().then(({ data }) => {
			setItemsType({ loading: false, data: data.map(t => ({ id: t.type_number, name: t.description })) })
		}).catch(err => console.log('Error fetching item types', err))

		fetchInks().then(({ data }) => {
			setInks({ loading: false, data: data.map(i => ({ id: i.id, name: i.name })) })
		}).catch(err => console.log('Error fetching inks', err))
	}, [])

	const Actions = () => (
		<TopToolbar>
			<ListButton />
		</TopToolbar>
	)

	const ToolbarForm = (props) => {
		return (
			<Toolbar {...props}>
				<SaveButton onClick={() => setRedirectTo('list')} />
				<SaveButton
					label='Save and Add'
					sx={{ mx: '1em' }}
					onClick={() => setRedirectTo('create')}
				/>
			</Toolbar>
		)
	}

	return (
		<Create
			mutationOptions={{
				onSuccess: (data) => {
					notify(`Item ${data.id} has been created`)
					if (redirectTo === 'create') {
						redirect(redirectTo, resource)
						setTimeout(() => window.location.reload(), 500)
					}
					if (redirectTo === 'list') {
						redirect(redirectTo, resource)
					}
				},
				onError: () => notify('No item has been created, please try again', 'warning')
			}}
			actions={<Actions />}
			{...props}
		>
			<SimpleForm toolbar={<ToolbarForm />}>
				<NumberInput fullWidth source='item_number' validate={required()} />
				<TextInput fullWidth source='description' validate={required()} />
				<AutocompleteInput
					fullWidth
					isLoading={boxes.loading}
					source='box_id'
					choices={boxes.data}
				/>
				<NumberInput fullWidth source='number_of_pcs_per_box' label='Number Of PCS/Box' validate={required()} />
				<AutocompleteInput
					fullWidth
					isLoading={boxes.loading}
					source='secondary_box_id'
					label='Secondary Box'
					choices={boxes.data}
				/>
				<NumberInput fullWidth source='number_of_pcs_per_secondary_box' label='Number Of PCS/Secondary Box' />
				<AutocompleteInput
					fullWidth
					isLoading={itemsType.loading}
					source='item_type_id'
					choices={itemsType.data}
				/>
				<AutocompleteInput
					fullWidth
					isLoading={inks.loading}
					source='ink_id'
					choices={inks.data}
				/>
				<NumberInput fullWidth source='ink_cost' label='Ink Cost($)' />
			</SimpleForm>
		</Create>
	)
}

export default ItemCreate
