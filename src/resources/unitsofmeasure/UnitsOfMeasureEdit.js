import React from 'react'
import { DeleteButton, Edit, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
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

export const UnitsOfMeasureEdit = (props) => (
  <Edit
    {...props}
    actions={<Actions />}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput disabled source='id' validate={required()} />
      <TextInput source='name' validate={required()} />
      <TextInput source='abbr' validate={required()} />
    </SimpleForm>
  </Edit>
)
