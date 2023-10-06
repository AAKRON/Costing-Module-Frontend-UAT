import React from 'react'
import { Filter, TextInput } from 'react-admin'

export const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search by username' source='q' alwaysOn/>
  </Filter>
)
