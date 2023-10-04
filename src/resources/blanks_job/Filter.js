import React from 'react'
import { Filter, TextInput } from 'react-admin'

export const Filter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by blank number' source='q' alwaysOn/>
  </Filter>
)
