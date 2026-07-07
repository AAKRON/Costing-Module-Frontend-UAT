import { useEffect, useState } from 'react'
import { AutocompleteInput, DeleteButton, Edit, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'
import ItemCostView from './ItemCostView'

export const ItemEdit = (props) => {
	const [boxes, setBoxes] = useState({
		loading: true,
		data: []
	})
	const [itemsType, setItemsType] = useState({
		loading: true,
		data: []
	})

	const fetchBoxes = () => restClient.getList('box-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})
	const fetchItemTypes = () => restClient.getList('item-type-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

	const Actions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
  )

	const ToolbarForm = (props) => {
		if(!isModifyPermission()) return false

		return (
			<Toolbar {...props}>
				<SaveButton />
				<DeleteButton mutationMode="pessimistic" />
			</Toolbar>
		)
	}

	useEffect(() => {
		fetchBoxes().then(({data}) => {
			const boxes = data.map(box => ({id: box.id, name: box.name}))
			setBoxes({ loading: false, data: boxes })
		}).catch((err) => {
			console.log('Error fetching boxes', err)
		})

		fetchItemTypes().then(({data}) => {
			const item_types = data.map(box => ({id: box.type_number, name: box.description}))
			setItemsType({ loading: false, data: item_types })
		}).catch((err) => {
			console.log('Error fetching item types', err)
		})
	}, [])

	return (
		<Edit
			{...props}
			actions={<Actions />}
		>
			<SimpleForm
				toolbar={<ToolbarForm />}
			>
				<TextInput source='id' disabled validate={required()}/>
				<NumberInput source='item_number' validate={required()}/>
				<TextInput multiline source='description' validate={required()}/>
				<AutocompleteInput
					isLoading={boxes.loading}
					source='box_id'
					choices={boxes.data}
					validate={required()}
				/>
				<NumberInput source='number_of_pcs_per_box' label='Number Of PCS/Box' validate={required()}/>
				<AutocompleteInput
					isLoading={boxes.loading}
					source='secondary_box_id'
					choices={boxes.data}
				/>
				<NumberInput source='number_of_pcs_per_secondary_box' label='Number Of PCS/Secondary Box'/>
				<AutocompleteInput
					source='item_type_id'
					choices={itemsType.data}
					isLoading={itemsType.loading}
				/>
				<NumberInput source='ink_cost' label='Ink Cost($)'/>
				<ItemCostView type='price'/>
				<ItemCostView type='inventory'/>
			</SimpleForm>
		</Edit>
	)
}
