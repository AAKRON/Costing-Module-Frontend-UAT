import React from 'react'
import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin'

export const JobCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source='job_number' validate={required()}/>
      <TextInput multiline source='description' validate={required()} />
      <ReferenceInput
        label='Screen'
        reference='screens'
        source='screen_id'
        perPage={0}
        allowEmpty
      >
          <SelectInput optionText='screen_size' />
      </ReferenceInput>
      <TextInput source='wages_per_hour' label='Wages/hr ($)' validate={required()}/>
    </SimpleForm>
  </Create>
)
