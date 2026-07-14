import React from 'react'
import { Filter, NumberInput, TextInput } from 'react-admin'

export const ScreenFilter = (props) => (
  <Filter {...props}>
    <NumberInput label='Search by ID' source='id' alwaysOn />
    <TextInput label='Search by screen size' source='screen_size' alwaysOn />
    <NumberInput label='Search by cost' source='cost' alwaysOn />
  </Filter>
)
