import React from 'react'
import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin'
import BlankCostView from './BlankCostView'

export const BlankEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
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
