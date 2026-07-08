import React from 'react'
import { Filter, TextInput } from 'react-admin'

export const LocationFilter = (props) => {
  return (
    <Filter
      {...props}
    >
      <TextInput
        label='Search by name'
        source='name'
        alwaysOn
      />
    </Filter>
  )
}
