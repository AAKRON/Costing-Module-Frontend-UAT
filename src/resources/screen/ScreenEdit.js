import { Edit, NumberInput, SimpleForm, TextInput, required } from 'react-admin'

export const ScreenEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source='id' validate={required()}/>
      <TextInput source='screen_size'validate={required()} />
      <NumberInput source='cost' validate={required()}/>
    </SimpleForm>
  </Edit>
)
