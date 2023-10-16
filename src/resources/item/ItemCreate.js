import React, { useEffect, useState } from 'react'
import { AutocompleteInput, Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import restClient from '../../providers/restClient'

const ItemCreate = (props) => {
	const [boxes, setBoxes] = useState([])
	const [itemsType, setItemsType] = useState([])

	const fetchBoxes = () => restClient.getList('box-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

	const fetchItemTypes = () => restClient.getList('item-type-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

	useEffect(() => {
		fetchBoxes().then(({data}) => {
			const boxes = data.map(box => ({id: box.id, name: box.name}));
			setBoxes(boxes)
		})

		fetchItemTypes().then(({data}) => {
			const item_types = data.map(box => ({id: box.type_number, name: box.description}));
			setItemsType(item_types)
		})
	}, [])

	const Actions = () => (
		<TopToolbar>
				<ListButton />
		</TopToolbar>
	)
	
	return(
		<Create
			actions={<Actions />}
			{...props}
		>
			<SimpleForm>
				<NumberInput source='item_number' validate={required()}/>
				<TextInput source='description' validate={required()}/>
				<AutocompleteInput source='box_id' choices={boxes}/>
				<AutocompleteInput source='item_type_id' choices={itemsType} />
			</SimpleForm>
		</Create>
	)
}

export default ItemCreate
