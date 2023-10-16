import React from 'react'
import { Edit, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

const ToolbarForm = (props) => {
  if(!isModifyPermission()) return false

  return(
    <Toolbar {...props} >
      <SaveButton />
    </Toolbar>
  )
}

export const GlobalVariableEdit = (props) => (
  <Edit
    {...props}
    actions={<Actions />}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput disabled source='id' validate={required()}/>
      <TextInput disabled source='name' validate={required()}/>
      <TextInput source='value' validate={required()}/>
    </SimpleForm>
  </Edit>
)
