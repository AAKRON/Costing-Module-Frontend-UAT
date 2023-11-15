import { useEffect, useState } from 'react'
import { AutocompleteInput, Create, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useNotify, useRedirect, useResourceContext } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'

const FinalCalculationCreate = (props) => {
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
	const [colors, setColors] = useState({
		loading: true,
		data: []
	})
  const [raw_materials, setRawMaterials] = useState({
    loading: true,
    data: []
  })

  const fetchBlanks = () => restClient.getList('blank-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  const fetchColors = () => restClient.getList('color-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  const fetchRawMaterials = () => restClient.getList('raw-material-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  useEffect(() => {
    fetchBlanks().then(({data}) => {
      const blanks = data.map(blank => ({id: blank.id, name: `${blank.id} - ${blank.description}`}))
      setBlanks({ loading: false, data: blanks })
    }).catch((err) => console.log('Error fetching blanks', err))

    fetchColors().then(({data}) => {
      const colors = data.map(color => ({id: color.name, name: color.name}))
      colors.push({id:'', name: 'No Colorant'})
      setColors({ loading: false, data: colors })
    }).catch((err) => console.log('Error fetching colors', err))

    fetchRawMaterials().then(({data}) => {
      const raw_materials = data.map(raw_material => ({id: raw_material.id, name: raw_material.name}))
      setRawMaterials({ loading: false, data: raw_materials })
    }).catch((err) => console.log('Error fetching raw materials', err))
  }, [])

  return (
    <Create
      mutationOptions={{
        onSuccess: (data) => {
          notify(`Final calculation ${data.id} has been created`)

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
          notify('No final calculation has been created, please try again', 'warning')
        }
      }}
      {...props}
      actions={<Actions />}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <AutocompleteInput
          isLoading={blanks.loading}
          source='blank_id'
          choices={blanks.data}
          validate={required()}
        />

        <NumberInput source='color_number' label='Color #' validate={required()}/>
        <TextInput source='color_description' validate={required()}/>

        <AutocompleteInput
          isLoading={raw_materials.loading}
          source='raw_material_id'
          choices={raw_materials.data}
          validate={required()}
        />

        <AutocompleteInput
          isLoading={colors.loading}
          source='colorant_one'
          choices={colors.data}
          validate={required()}
        />

        <NumberInput source='number_of_pieces_per_unit_one' validate={required()}/>
        <NumberInput source='percentage_of_colorant_one' validate={required()}/>

        <AutocompleteInput
          isLoading={colors.loading}
          source='colorant_two'
          choices={colors.data}
          validate={required()}
        />

        <NumberInput source='number_of_pieces_per_unit_two' validate={required()} />
        <NumberInput source='percentage_of_colorant_two' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}

export default FinalCalculationCreate


