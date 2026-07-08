import React from 'react'
import { BooleanInput, DeleteButton, Edit, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
import { isModificationPermission } from '../../helpers/functions'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

const ToolbarForm = (props) => {
  if(!isModificationPermission()) return false

  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  )
}

export const LocationEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput fullWidth disabled source='id' validate={required()}/>
      <TextInput fullWidth source='name' validate={required()} />
      <BooleanInput
        fullWidth
        source='active_flag'
      />
    </SimpleForm>
  </Edit>
)
