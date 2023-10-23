import React from 'react'
import { Create, ListButton, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const UnitsOfMeasureCreate = (props) => {
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
        <TextInput source='name' validate={required()} />
        <TextInput source='abbr' validate={required()} />
      </SimpleForm>
    </Create>
  )
}
