import {
  Edit,
  ListButton,
  SimpleForm,
  TextInput,
  TopToolbar,
  required,
  useEditController
} from 'react-admin'
import AddJobModal from '../../components/AddJobModal'
import CopyJobModal from '../../components/CopyJobModal'
import JobTable from '../../components/JobTable'
import { isAdmin, isModifyPermission } from '../../helpers/functions'

const Actions = ({ data, docNumber }) => (
  <TopToolbar sx={{
    display: 'flex',
    alignItems: 'center',
  }}>
    <ListButton />

    {isAdmin() && isModifyPermission() && (
      <AddJobModal data={data} docNumber={docNumber} type='item' />
    )}

    {isAdmin() && isModifyPermission() && (
      <CopyJobModal data={data} docNumber={docNumber} type='item' />
    )}
  </TopToolbar>
)

export const ItemJobEdit = (props) => {
  const { record } = useEditController(props)

  if (!record) {
    return null
  }

  return (
    <Edit
      actions={<Actions data={record} docNumber={record.item_number} />}
      {...props}
    >
      <SimpleForm
        toolbar={false}
      >
        <TextInput disabled source='id' validate={required()}/>
        <TextInput disabled source='item_number' label='Item Number' validate={required()}/>
        <TextInput disabled source='description' label='Description' validate={required()}/>
        <JobTable
          jobsInitial={record.jobs}
          docNumber={record.item_number}
          resource='item_jobs'
        />
      </SimpleForm>
    </Edit>
  )
}