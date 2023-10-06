import React from 'react'
import { Create, ListButton, SelectInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const UserCreate = (props) => (
  <Create
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <TextInput source='username' validate={required()}/>
      <TextInput source='password' validate={required()}/>
      <SelectInput source='role' validate={required()} choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
      ]} />
    </SimpleForm>
  </Create>
)
