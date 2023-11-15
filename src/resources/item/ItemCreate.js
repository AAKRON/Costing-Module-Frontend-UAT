import React, { useEffect, useState } from 'react'
import { AutocompleteInput, Create, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'

const ItemCreate = (props) => {
	if(!isModifyPermission()){
    return null
  }

  const [redirectTo, setRedirectTo] = useState('list')
  const redirect = useRedirect()
  const notify = useNotify()
  const resource = useResourceContext()

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

	useEffect(() => {
		fetchBoxes().then(({data}) => {
			const boxes = data.map(box => ({id: box.id, name: box.name}));
			setBoxes({ loading: false, data: boxes })
		}).catch((err) => {
			console.log('Error fetching boxes', err)
		})

		fetchItemTypes().then(({data}) => {
			const item_types = data.map(box => ({id: box.type_number, name: box.description}));
			setItemsType({ loading: false, data: item_types })
		}).catch((err) => {
			console.log('Error fetching item types', err)
		})
	}, [])

	const Actions = () => (
		<TopToolbar>
				<ListButton />
		</TopToolbar>
	)
	
	const ToolbarForm = (props) => {
    return (
      <Toolbar {...props}>
        <SaveButton
          onClick={() => {
            setRedirectTo('list')
          }}
        />

        <SaveButton
          label='Save and Add'
          sx={{ mx: '1em' }}
          onClick={() => {
            setRedirectTo('create')
          }}
        />
      </Toolbar>
    )
  }

	return(
		<Create
			mutationOptions={{
				onSuccess: (data) => {
					notify(`Item ${data.id} has been created`)

					if(redirectTo === 'create') {
						redirect(redirectTo, resource)

						setTimeout(() => {
							window.location.reload()
						}, 500)
					}

					if(redirectTo === 'list') {
						redirect(redirectTo, resource)
					}
				},
				onError: () => {
					notify('No item has been created, please try again', 'warning')
				}
			}}
			actions={<Actions />}
			{...props}
		>
			<SimpleForm
				toolbar={<ToolbarForm />}
			>
				<NumberInput source='item_number' validate={required()}/>
				<TextInput source='description' validate={required()}/>
				<AutocompleteInput
					isLoading={boxes.loading}
					source='box_id'
					choices={boxes.data}
				/>
				<AutocompleteInput
					isLoading={itemsType.loading}
					source='item_type_id'
					choices={itemsType.data}
				/>
			</SimpleForm>
		</Create>
	)
}

export default ItemCreate
