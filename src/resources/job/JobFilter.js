import React from 'react'
import { Filter, NumberInput, ReferenceInput, SelectInput, TextInput } from 'react-admin'

export const JobFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput label='Search by description' source='description' alwaysOn />
      <NumberInput label='Search by job number' source='job_number' alwaysOn />

      <TextInput label='Search by Wages/HR' source='wages_hr' />
      <ReferenceInput
        label='Search by screen size'
        reference='screens'
        source='screen_id'
        perPage={0}
        alwaysOn
      >
        <SelectInput optionText='screen_size' />
      </ReferenceInput>
    </Filter>
  )
}
