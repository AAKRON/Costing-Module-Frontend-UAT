import { Edit, ListButton, SaveButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useEditController } from 'react-admin'
import JobTable from '../../components/JobTable'

// import { AddJobModal } from '../../components/AddJobModal';
// import { CopyJobModal } from '../../components/CopyJobModal';

const Actions = () => (
  <TopToolbar>
    <ListButton />
    {/* {localStorage.getItem('role') === 'admin' && (
      <AddJobModal data={data} type='blank' submitForm={() => 1} />
    )}
    {localStorage.getItem('role') === 'admin' && (
      <CopyJobModal data={data} type='blank' submitForm={() => 1} />
    )} */}
  </TopToolbar>
)

const CustomToolbar = (props) => (
  <Toolbar {...props} >
    <SaveButton alwaysEnable/>
  </Toolbar>
)

export const BlankJobEdit = (props) => {
  const { record } = useEditController(props)

  if (!record) {
    return null
  }

  return (
    <Edit
      actions={<Actions />}
      {...props}
    >
      <SimpleForm
        toolbar={<CustomToolbar />}
      >
        <TextInput disabled source='id' validate={required()}/>
        <TextInput source='blank_number' label='Blank Number' validate={required()}/>
        <TextInput source='description' label='Description' validate={required()}/>
        <JobTable
          jobsInitial={record.jobs}
          onUpdate={(updatedJobs) => {
            record.jobs = updatedJobs
          }}
        />
      </SimpleForm>
    </Edit>
  )
}
