import { useEffect, useState } from 'react'
import { AutocompleteInput, Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import restClient from '../../providers/restClient'

const RawMaterialCreate = (props) => {
	if(!isModifyPermission()){
    return null
  }

	const [unitsMeasures, setUnitsMeasures] = useState({
    loading: true,
    data: []
  })
  const [colors, setColors] = useState({
    loading: true,
    data: []
  })
  const [vendors, setVendors] = useState({
    loading: true,
    data: []
  })
  const [rawMaterialTypes, setRawMaterialTypes] = useState({
    loading: true,
    data: []
  })

  const Actions = () => (
		<TopToolbar>
				<ListButton />
		</TopToolbar>
	)

  const fetchUnitsMeasures = () =>
    restClient.getList('units-of-measure-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  const fetchColors = () =>
    restClient.getList('color-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  const fetchVendors = () =>
    restClient.getList('vendor-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  const fetchRawMaterialTypes = () =>
    restClient.getList('raw-material-type-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }})

  useEffect (() => {
    fetchUnitsMeasures().then(({data}) => {
      const units_measures = data.map(unit => ({id: unit.id, name: unit.name}));
      setUnitsMeasures({ loading: false, data: units_measures })
    }).catch((err) => {
      console.log('Error fetching units of measure', err)
    })

    fetchColors().then(({data}) => {
      const colors = data.map(color => ({id: color.id, name: color.name}));
      setColors({ loading: false, data: colors })
    }).catch((err) => {
      console.log('Error fetching colors', err)
    })

    fetchVendors().then(({data}) => {
      const vendors = data.map(vendor => ({id: vendor.id, name: vendor.name}));
      setVendors({ loading: false, data: vendors })
    }).catch((err) => {
      console.log('Error fetching vendors', err)
    })

    fetchRawMaterialTypes().then(({data}) => {
      const raw_material_types = data.map(raw_material_type => ({id: raw_material_type.id, name: raw_material_type.name}))
      setRawMaterialTypes({ loading: false, data: raw_material_types })
    }).catch((err) => {
      console.log('Error fetching raw material types', err)
    })
  }, [])

  console.log('unitsMeasures', unitsMeasures.data)

  return(
    <Create
      actions={<Actions />}
      {...props}
    >
      <SimpleForm>
        <TextInput source='name' validate={required()}/>
        <NumberInput source='cost' label='Cost ($)' validate={required()}/>
        <AutocompleteInput
          isLoading={unitsMeasures.loading}
          source='units_of_measure_id'
          choices={unitsMeasures.data}
          validate={required()}
        />
        <AutocompleteInput
          isLoading={colors.loading}
          source='color_id'
          choices={colors.data}
          validate={required()}
        />
        <AutocompleteInput
          isLoading={vendors.loading}
          source='vendor_id'
          choices={vendors.data}
          validate={required()}
        />
        <AutocompleteInput
          isLoading={rawMaterialTypes.loading}
          source='rawmaterialtype_id'
          label='Raw Material Type'
          choices={rawMaterialTypes.data}
          validate={required()}
        />
      </SimpleForm>
    </Create>
  )
}

export default RawMaterialCreate