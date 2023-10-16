import React from 'react'
import { DeleteButton, Edit, ListButton, NumberInput, ReferenceInput, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'
import BlankCostView from './BlankCostView'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

const ToolbarForm = (props) => {
  if(!isModifyPermission()) return false

  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" />
    </Toolbar>
  )
}

export const BlankEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput disabled source='id' validate={required()}/>
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
      <BlankCostView type='price' />
      <BlankCostView type='inventory' />
    </SimpleForm>
  </Edit>
)
