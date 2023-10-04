import React from 'react'
import { Create, NumberInput, SimpleForm, TextInput, required } from 'react-admin'

export const ScreenCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='screen_size' validate={required()}/>
      <NumberInput source='cost' label='Cost ($)' validate={required()}/>
    </SimpleForm>
  </Create>
)
