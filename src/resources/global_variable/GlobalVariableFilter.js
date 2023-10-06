import React from 'react'
import { Filter, TextInput } from 'react-admin'

export const GlobalVariableFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by name' source='q' alwaysOn/>
  </Filter>
)
