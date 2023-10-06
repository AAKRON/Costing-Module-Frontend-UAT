import { Edit, ListButton, NumberInput, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

const Actions = () => (
  <TopToolbar>
      <ListButton />
  </TopToolbar>
)

export const ScreenEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm>
      <TextInput disabled source='id' validate={required()}/>
      <TextInput source='screen_size'validate={required()} />
      <NumberInput source='cost' validate={required()}/>
    </SimpleForm>
  </Edit>
)
