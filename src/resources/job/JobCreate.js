import React from 'react'
import { Create, ListButton, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const JobCreate = (props) => (
  <Create
    actions={<Actions />}
    {...props}
  >
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
