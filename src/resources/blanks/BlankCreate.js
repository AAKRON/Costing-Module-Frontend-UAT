import React from 'react'
import { Create, ListButton, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

export const BlankCreate = (props) => {
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
        <NumberInput source='blank_number' validate={required()}/>
        <TextInput multiline source='description' validate={required()}/>
        <ReferenceInput
          label='Blank Type'
          reference='blank_types'
          source='blank_type_id'
          perPage={0}
        >
            <SelectInput optionText='description' validate={required()} />
        </ReferenceInput>
        <NumberInput source='cost' label='Cost($)' validate={required()}/>
      </SimpleForm>
    </Create>
  )
}
