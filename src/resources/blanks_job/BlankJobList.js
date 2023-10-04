import React from 'react';
import {
  Datagrid,
  EditButton,
  Filter,
  List,
  TextInput,
  TextField,
} from 'admin-on-rest/lib/mui';
import { NumberInput } from 'admin-on-rest/lib/mui/input';

const BlanksJobFilter = (props) => (
  <Filter {...props}>
    <NumberInput
      label="Search by number of jobs"
      source="number_of_jobs"
      alwaysOn
    />
    <TextInput label="Search by description" source="description" alwaysOn />
    <NumberInput
      label="Search by blank number"
      source="blank_number"
      alwaysOn
    />
  </Filter>
);

export const BlanksJobList = (props) => (
  <List
    title="Blanks and Job"
    sort={{ field: 'id', order: 'ASC' }}
    filters={<BlanksJobFilter />}
    perPage={100}
    {...props}
  >
    <Datagrid>
      {/* <TextField source="id" /> */}
      <TextField source="blank_number" />
      <TextField source="description" />
      <TextField source="number_of_jobs" />
      <EditButton />
    </Datagrid>
  </List>
);
