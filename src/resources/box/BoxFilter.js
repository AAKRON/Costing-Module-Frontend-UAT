import React from 'react'
import { Filter, NumberInput, TextInput } from 'react-admin'

export const BoxFilter = (props) => (
  <Filter {...props}>
    <NumberInput label='Search by box ID' source='id' alwaysOn />
    <TextInput label='Search by box name' source='name' alwaysOn />
    <NumberInput label='Search by cost per box' source='cost_per_box' alwaysOn />
  </Filter>
)
