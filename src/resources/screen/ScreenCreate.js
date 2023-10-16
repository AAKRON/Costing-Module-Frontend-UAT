import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const ScreenCreate = (props) => {
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
        <TextInput source='screen_size' validate={required()}/>
        <NumberInput source='cost' label='Cost ($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
