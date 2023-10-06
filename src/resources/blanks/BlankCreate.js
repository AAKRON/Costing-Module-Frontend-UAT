import React from 'react'
import { Create, ListButton, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const BlankCreate = (props) => (
  <Create
    {...props}
    actions={<Actions />}
  >
    <SimpleForm>
      <NumberInput source='blank_number' validate={required()}/>
      <TextInput multiline source='description' validate={required()}/>
      <ReferenceInput
        label='Blank Type'
        reference='blank_types'
        source='blank_type_id'
        perPage={0}
      >
          <SelectInput optionText='description' validate={required()} />
      </ReferenceInput>
      <NumberInput source='cost' label='Cost($)' validate={required()}/>
    </SimpleForm>
  </Create>
)
