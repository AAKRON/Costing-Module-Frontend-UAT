import { useEffect, useState } from 'react'
import { AutocompleteInput, DeleteButton, Edit, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useEditController } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'
import ItemCostView from './ItemCostView'

export const ItemEdit = (props) => {
	const { record } = useEditController(props)

	const [boxes, setBoxes] = useState({ loading: true, data: [] })
	const [itemsType, setItemsType] = useState({ loading: true, data: [] })
	const [inks, setInks] = useState({ loading: true, data: [] })

	const fetchBoxes = () => restClient.getList('box-list-only', { pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' } })
	const fetchItemTypes = () => restClient.getList('item-type-list-only', { pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' } })
	const fetchInks = () => restClient.getList('ink-list-only', { pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' } })

	const Actions = () => (
		<TopToolbar>
			<ListButton />
		</TopToolbar>
	)

	const ToolbarForm = (props) => {
		if (!isModifyPermission()) return false
		return (
			<Toolbar {...props}>
				<SaveButton />
				<DeleteButton mutationMode="pessimistic" />
			</Toolbar>
		)
	}

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

	return (
		<Edit
			{...props}
			actions={<Actions />}
		>
			<SimpleForm toolbar={<ToolbarForm />}>
				<TextInput source='id' disabled validate={required()} />
				<NumberInput source='item_number' validate={required()} />
				<TextInput multiline source='description' validate={required()} />
				<AutocompleteInput
					fullWidth
					isLoading={boxes.loading}
					source='box_id'
					choices={boxes.data}
				/>
				<NumberInput source='number_of_pcs_per_box' label='Number Of PCS/Box' validate={required()} />
				<AutocompleteInput
					fullWidth
					isLoading={boxes.loading}
					source='secondary_box_id'
					label='Secondary Box'
					choices={boxes.data}
				/>
				<NumberInput source='number_of_pcs_per_secondary_box' label='Number Of PCS/Secondary Box' />
				<AutocompleteInput
					fullWidth
					source='item_type_id'
					choices={itemsType.data}
					isLoading={itemsType.loading}
				/>
				<AutocompleteInput
					fullWidth
					source='ink_id'
					choices={inks.data}
					isLoading={inks.loading}
					helperText="If no ink is selected, the ink_cost field will be used for calculations"
				/>
				{!record?.ink_id && (
					<NumberInput fullWidth source='ink_cost' label='Ink Cost($)' />
				)}
				<ItemCostView type='price' />
				<ItemCostView type='inventory' />
			</SimpleForm>
		</Edit>
	)
}
