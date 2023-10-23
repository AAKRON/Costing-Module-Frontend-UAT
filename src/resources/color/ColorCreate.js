import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const ColorCreate = (props) => {
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
        <TextInput source='code' validate={required()}/>
        <TextInput source='name' validate={required()}/>
        <NumberInput source='cost_of_color' label='Cost($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
