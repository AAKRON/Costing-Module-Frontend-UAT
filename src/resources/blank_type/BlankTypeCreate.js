import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const BlankTypeCreate = (props) => (
  <Create
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <NumberInput source='type_number' validate={required()}/>
      <TextInput multiline source='description' validate={required()}/>
    </SimpleForm>
  </Create>
)
