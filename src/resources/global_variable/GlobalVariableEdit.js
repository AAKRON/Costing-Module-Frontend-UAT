import React from 'react'
import { Edit, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

const EditToolbar = (props) => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
)

export const GlobalVariableEdit = (props) => (
  <Edit
    {...props}
    actions={<Actions />}
  >
    <SimpleForm
      toolbar={<EditToolbar />}
    >
      <TextInput disabled source='id' validate={required()}/>
      <TextInput disabled source='name' validate={required()}/>
      <TextInput source='value' validate={required()}/>
    </SimpleForm>
  </Edit>
)
