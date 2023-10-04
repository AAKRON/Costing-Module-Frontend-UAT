import { CardActions } from '@mui/material'
import { Edit, ListButton, SimpleForm, TextInput, required } from 'react-admin'

// import {
//     DisabledInput,
//     Edit,
//     ListButton,
//     SimpleForm,
//     TextInput,
// } from 'admin-on-rest/lib/mui';
// import { AddJobModal } from '../../components/AddJobModal';
// import { CopyJobModal } from '../../components/CopyJobModal';
// import JobTable from '../../components/JobTable';

const cardActionStyle = {
  zIndex: 2,
  position: 'absolute',
  right: '2rem',
}

const PostEditActions = ({ basePath, data, refresh }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    {/* {localStorage.getItem('role') === 'admin' && (
      <AddJobModal data={data} type='blank' submitForm={() => 1} />
    )}
    {localStorage.getItem('role') === 'admin' && (
      <CopyJobModal data={data} type='blank' submitForm={() => 1} />
    )} */}
  </CardActions>
)

export const BlankJobEdit = (props) => {
  return (
    <Edit
      actions={<PostEditActions />}
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
