import React from 'react'
import { Filter, TextInput } from 'react-admin'

export const BLBIFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by item number' source='q' alwaysOn/>
  </Filter>
)
