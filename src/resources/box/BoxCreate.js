import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const BoxCreate = (props) => {
  if(!isModifyPermission()){
    return null
  }

  const Actions = () => (
    <TopToolbar>
        <ListButton />
    </TopToolbar>
  )

  return (
    <Create
      {...props}
      actions={<Actions />}
    >
      <SimpleForm>
        <TextInput source='name' validate={required()}/>
        <NumberInput source='cost_per_box' label='Cost per box($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
