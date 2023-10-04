import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  TextField,
  Filter,
  TextInput,
} from 'admin-on-rest/lib/mui';
import { NumberInput } from 'admin-on-rest/lib/mui/input';

const BlankTypeFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by description" source="description" alwaysOn />
    <NumberInput
      label="Search by blank type number"
      source="type_number"
      alwaysOn
    />
  </Filter>
);

export const BlankTypeListing = (props) => (
  <List
    title="Blank Types Listing"
    sort={{ field: 'id', order: 'ASC' }}
    filters={<BlankTypeFilter />}
    {...props}
  >
    <Datagrid>
      {/* <TextField source="id" /> */}
      <TextField source="type_number" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);
