import { Edit, ListButton, SimpleForm, TextInput, TopToolbar, required } from 'react-admin'

// import { AddJobModal } from '../../components/AddJobModal';
// import { CopyJobModal } from '../../components/CopyJobModal';
// import JobTable from '../../components/JobTable';

const cardActionStyle = {
  zIndex: 2,
  position: 'absolute',
  right: '2rem',
}

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

export const BlankJobEdit = (props) => {
  return (
    <Edit
      actions={<Actions />}
      {...props}
    >
      <SimpleForm>
        <TextInput disabled source='id' validate={required()}/>
        <TextInput source='blank_number' label='Blank Number' validate={required()}/>
        <TextInput source='description' label='Description' validate={required()}/>
        {/* <JobTable /> */}
      </SimpleForm>
    </Edit>
  )
}
