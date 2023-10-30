import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const BLBICreate = (props) => {
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
        <NumberInput source='item_number' validate={required()}/>
        <NumberInput source='blank_number' validate={required()}/>
        <NumberInput source='mult' label='Multiplication' validate={required()}/>
        <NumberInput source='div' label='Division'validate={required()} />
      </SimpleForm>
    </Create>
  )
}
