import React from 'react'
import { DeleteButton, Edit, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const ItemTypeEdit = (props) => {
  const ToolbarForm = (props) => {
    if(!isModifyPermission()) return false
  
    return (
      <Toolbar {...props}>
        <SaveButton />
        <DeleteButton mutationMode="pessimistic" />
      </Toolbar>
    )
  }

  return (
    <Edit
      actions={<Actions />}
      {...props}
    >
      <SimpleForm
        toolbar={<ToolbarForm />}
      >
        <TextInput source='id' disabled validate={required()} />
        <NumberInput source='type_number' validate={required()}/>
        <TextInput source='description' validate={required()}/>
      </SimpleForm>
    </Edit>
  )
}
