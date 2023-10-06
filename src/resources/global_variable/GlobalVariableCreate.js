import React from 'react'
import { Create, ListButton, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const GlobalVariableCreate = (props) => (
  <Create
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <TextInput source='name' validate={required()} />
      <TextInput source='value' validate={required()}/>
    </SimpleForm>
  </Create>
)
