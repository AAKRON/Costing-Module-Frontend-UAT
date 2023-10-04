import React from 'react'
import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin'

export const BlankCreate = (props) => (
  <Create {...props}>
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
