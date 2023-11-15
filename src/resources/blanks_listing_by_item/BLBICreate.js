import React, { useEffect, useState } from 'react'
import { AutocompleteInput, Create, ListButton, NumberInput, SaveButton, SimpleForm, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'

export const BLBICreate = (props) => {
  if(!isModifyPermission()){
    return null
  }

  const [redirectTo, setRedirectTo] = useState('list')
  const redirect = useRedirect()
  const notify = useNotify()
  const resource = useResourceContext()

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

	const [blanks, setBlanks] = useState({
		loading: true,
		data: []
	})
	const [items, setItems] = useState({
		loading: true,
		data: []
	})

  const fetchBlanks = () => restClient.getList('blank-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  const fetchItems = () => restClient.getList('item-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})


  useEffect(() => {
    fetchBlanks().then(({data}) => {
      const blanks = data.map(blank => ({id: blank.id, name: `${blank.id} - ${blank.description}`}))
      setBlanks({ loading: false, data: blanks })
    }).catch((err) => console.log('Error fetching blanks', err))


    fetchItems().then(({ data }) => {
      const items = data.map(
        (item) => ({
          id: item.item_number,
          name: `${item.item_number} - ${item.description}`,
        })
      )
      setItems({ loading: false, data: items })
    }).catch((err) => {
      console.log('Error fetching items', err)
    })
  }, [])
  
  return (
    <Create
      mutationOptions={{
        onSuccess: (data) => {
          notify(`Blank listing ${data.id} has been created`)

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
          notify('No blank listing has been created, please try again', 'warning')
        }
      }}
      {...props}
      actions={<Actions />}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <AutocompleteInput
          isLoading={items.loading}
          source='item_number'
          choices={items.data}
          validate={required()}
        />

        <AutocompleteInput
          isLoading={blanks.loading}
          source='blank_number'
          choices={blanks.data}
          validate={required()}
        />

        <NumberInput source='mult' label='Multiplication' validate={required()}/>
        <NumberInput source='div' label='Division'validate={required()} />
      </SimpleForm>
    </Create>
  )
}
