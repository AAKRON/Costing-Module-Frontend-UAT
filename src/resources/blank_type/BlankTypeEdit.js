import React from 'react'
import { Edit, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const BlankTypeEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <TextInput disabled source='id' validate={required()}/>
      <NumberInput source='type_number' validate={required()}/>
      <TextInput multiline source='description' validate={required()}/>
    </SimpleForm>
  </Edit>
)
