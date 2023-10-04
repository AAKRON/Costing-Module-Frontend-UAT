import React from 'react';
import {
  Filter,
  // TextInput,
  ReferenceInput,
  SelectInput,
} from 'admin-on-rest/lib/mui';
import { NumberInput } from 'admin-on-rest/lib/mui/input';
// import PriceField from '../../components/PriceField';

export const ScreenFilter = (props) => (
  <Filter {...props}>
    <NumberInput label="Search by cost" source="cost" alwaysOn />
    <ReferenceInput
      label="Search by screen size"
      reference="screens"
      source="screen_id"
      perPage={0}
      alwaysOn
    >
      <SelectInput optionText="screen_size" />
    </ReferenceInput>
    <NumberInput label="Search by id" source="id" alwaysOn />
  </Filter>
);
