import React from 'react'
import { Filter, NumberInput, TextInput } from 'react-admin'

export const ItemJobFilter = (props) => (
  <Filter {...props}>
    <NumberInput label='Search by number of jobs' source='number_of_jobs' alwaysOn />
    <TextInput label='Search by description' source='description' alwaysOn/>
    <NumberInput label='Search by item number' source='item_number' alwaysOn/>
  </Filter>
)
