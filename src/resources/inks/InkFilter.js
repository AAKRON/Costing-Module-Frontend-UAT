import React from 'react'
import { Filter, NumberInput, TextInput } from 'react-admin'

export const InkFilter = (props) => (
  <Filter {...props}>
    <NumberInput label='Search by ink ID' source='id' alwaysOn />
    <TextInput label='Search by ink name' source='name' alwaysOn />
    <NumberInput label='Search by ink cost' source='ink_cost' alwaysOn />
  </Filter>
)
