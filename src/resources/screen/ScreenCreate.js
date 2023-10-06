import React from 'react'
import { Create, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const ScreenCreate = (props) => (
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
