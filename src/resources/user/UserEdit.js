import React from 'react'
import { Edit, ListButton, SelectInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const UserEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <TextInput disabled source='id' validate={required()}/>
      <TextInput source='username' validate={required()}/>
      <SelectInput source='role' validate={required()} choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
      ]} />
      <TextInput source='password' type='password' />
    </SimpleForm>
  </Edit>
)
