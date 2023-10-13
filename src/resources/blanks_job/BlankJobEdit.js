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

const Actions = ({ data, docNumber }) => (
  <TopToolbar sx={{
    display: 'flex',
    alignItems: 'center',
  }}>
    <ListButton />

    {localStorage.getItem('role') === 'admin' && (
      <AddJobModal data={data} docNumber={docNumber} type='blank' />
    )}

    {localStorage.getItem('role') === 'admin' && (
      <CopyJobModal data={data} docNumber={docNumber} type='blank' />
    )}
  </TopToolbar>
)

export const BlankJobEdit = (props) => {
  const { record } = useEditController(props)

  if (!record) {
    return null
  }

  return (
    <Edit
      actions={<Actions data={record} docNumber={record.blank_number} />}
      {...props}
    >
      <SimpleForm
        toolbar={false}
      >
        <TextInput disabled source='id' validate={required()}/>
        <TextInput disabled source='blank_number' label='Blank Number' validate={required()}/>
        <TextInput disabled source='description' label='Description' validate={required()}/>
        <JobTable
          jobsInitial={record.jobs}
          docNumber={record.blank_number}
          resource='blank_jobs'
        />
      </SimpleForm>
    </Edit>
  )
}
