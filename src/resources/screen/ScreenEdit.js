import { DeleteButton, Edit, ListButton, NumberInput, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required } from 'react-admin'
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

export const ScreenEdit = (props) => (
  <Edit
    actions={<Actions />}
    {...props}
  >
    <SimpleForm
      toolbar={<ToolbarForm />}
    >
      <TextInput disabled source='id' validate={required()}/>
      <TextInput source='screen_size'validate={required()} />
      <NumberInput source='cost' validate={required()}/>
    </SimpleForm>
  </Edit>
)
