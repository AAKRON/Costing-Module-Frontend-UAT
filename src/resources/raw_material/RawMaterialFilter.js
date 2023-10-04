import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';
import { NumberInput } from 'admin-on-rest/lib/mui/input';

export const RawMaterialFilter = (props) => (
    <Filter {...props}>
    <TextInput label="Search by color" source="color" alwaysOn/>
        <TextInput label="Search by unit" source="unit" />
        <NumberInput label="Search by cost" source="cost" />
        <TextInput label="Search by vendor" source="vendor" alwaysOn/>
        <TextInput label="Search by type" source="raw_material_type" alwaysOn/>
        <TextInput label="Search by raw material name" source="name" alwaysOn/>
    </Filter>
);
