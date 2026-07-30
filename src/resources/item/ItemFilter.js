import React, { useEffect, useState } from 'react'
import { Filter, NumberInput, SelectInput, TextInput } from 'react-admin'
import restClient from '../../providers/restClient'

export const ItemFilter = (props) => {
  const [locations, setLocations] = useState({ loading: true, data: [] })

  useEffect(() => {
    restClient.getList('locations', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' } })
      .then(({ data }) => {
        setLocations({
          loading: false,
          data: data.filter(l => l.active_flag).map(l => ({ id: l.id, name: l.name })),
        })
      })
      .catch(err => {
        console.log('Error fetching locations', err)
        setLocations({ loading: false, data: [] })
      })
  }, [])

  return (
    <Filter {...props}>
      <NumberInput label='Search by item number' source='item_number' alwaysOn />
      <TextInput label='Search by description' source='description' alwaysOn />
      <TextInput label='Search by type description' source='type_description' alwaysOn />
      <TextInput label='Search by box name' source='box_name' alwaysOn />
      <SelectInput label='Location' source='location_id' choices={locations.data} isLoading={locations.loading} alwaysOn />
      <NumberInput label='Search by Pcs/Box' source='number_of_pcs_per_box' />
      <NumberInput label='Search by ink cost' source='ink_cost' />
      <NumberInput label='Search by box cost' source='box_cost' />
      <NumberInput label='Search by total price cost' source='total_price_cost' />
      <NumberInput label='Search by total inventory cost' source='total_inventory_cost' />
    </Filter>
  )
}
