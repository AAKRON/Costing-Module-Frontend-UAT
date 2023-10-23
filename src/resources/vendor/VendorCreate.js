import React from 'react'
import { Create, ListButton, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const VendorCreate = (props) => {
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
      actions={<Actions />}
      {...props}
    >
      <SimpleForm>
        <TextInput source='name' validate={required()} />
        <TextInput source='code' validate={required()} />
      </SimpleForm>
    </Create>
  )
}
