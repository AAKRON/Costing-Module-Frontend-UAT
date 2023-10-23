import React from 'react'
import { DeleteButton, Edit, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

const ToolbarForm = (props) => {
  if(!isModifyPermission()) return false

  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  )
}

export const RawMaterialTypeEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput disabled source='id' />
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
)
