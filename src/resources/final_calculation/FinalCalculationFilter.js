import React from 'react'
import { Filter, TextInput } from 'react-admin'

export const FinalCalculationFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by raw material' source='raw_material' alwaysOn />
    <TextInput label='Search by color' source='color_description' alwaysOn />
    <TextInput label='Search by blank name' source='blank_name' alwaysOn />
    <TextInput label='Search by blank number' source='q' alwaysOn />
  </Filter>
)
