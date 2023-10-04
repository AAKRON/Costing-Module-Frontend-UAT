import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const FinalCalculationFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by raw material" source="raw_material" alwaysOn />
    <TextInput label="Search by color" source="color_description" alwaysOn />
    <TextInput label="Search by blank name" source="blank_name" alwaysOn />
    <TextInput label="Search by blank number" source="q" alwaysOn />
  </Filter>
);
