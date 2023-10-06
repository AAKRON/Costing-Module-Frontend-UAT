import React from 'react'
import { Edit, ListButton, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const JobEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <TextInput disabled source='id' validate={required()}/>
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
      <NumberInput label='Wages/hr ($)' source='wages_per_hour' validate={required()} />
    </SimpleForm>
  </Edit>
)

