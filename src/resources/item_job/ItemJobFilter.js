import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';
import { NumberInput } from 'admin-on-rest/lib/mui/input';

export const ItemJobFilter = (props) => (
    <Filter {...props}>
    <NumberInput label="Search by number of jobs" source="number_of_jobs" alwaysOn />
        <TextInput label="Search by description" source="description" alwaysOn/>
        <NumberInput label="Search by item number" source="item_number" alwaysOn/>
    </Filter>
);
