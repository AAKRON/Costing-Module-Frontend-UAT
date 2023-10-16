import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const ItemTypeCreate = (props) => {
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
        <NumberInput source='type_number' validate={required()}/>
        <TextInput source='description' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
