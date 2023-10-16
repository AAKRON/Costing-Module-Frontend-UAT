import React from 'react'
import { DeleteButton, Edit, ListButton, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

const ToolbarForm = (props) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  )
}

export const UserEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
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
