import React from 'react'
import { DeleteButton, Edit, ListButton, NumberInput, ReferenceInput, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
import { isModifyPermission } from '../../helpers/functions'

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

export const JobEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput disabled source='id' validate={required()}/>
      <NumberInput source='job_number' validate={required()}/>
      <TextInput multiline source='description' validate={required()} />
      <ReferenceInput
        label='Screen'
        reference='screens'
        source='screen_id'
        perPage={0}
        allowEmpty
      >
        <SelectInput optionText='screen_size' />
      </ReferenceInput>
      <NumberInput label='Wages/hr ($)' source='wages_per_hour' validate={required()} />
    </SimpleForm>
  </Edit>
)

