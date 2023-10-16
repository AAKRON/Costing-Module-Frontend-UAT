import React from 'react'
import { DeleteButton, Edit, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
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

export const BoxEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput source='id' disabled validate={required()}/>
      <TextInput source='name' validate={required()}/>
      <NumberInput source='cost_per_box' label='Cost per box($)' validate={required()}/>
    </SimpleForm>
  </Edit>
)
