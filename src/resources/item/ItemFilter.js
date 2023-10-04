import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';
import { NumberInput } from 'admin-on-rest/lib/mui/input';

export const ItemFilter = (props) => (
    <Filter {...props}>
        <NumberInput label="Search by total inventory cost" source="total_inventory_cost"/>
        <NumberInput label="Search by total price cost" source="total_price_cost"/>
        <NumberInput label="Search by box cost" source="box_cost"/>
        <NumberInput label="Search by ink cost" source="ink_cost"/>
        <TextInput label="Search by Pcs/Box" source="number_of_pcs_per_box"/>
        <TextInput label="Search by box name" source="box_name" alwaysOn/>
        <TextInput label="Search by type description" source="type_description" alwaysOn/>
        <TextInput label="Search by description" source="description" alwaysOn/>
        <NumberInput label="Search by item number" source="item_id" alwaysOn/>
    </Filter>
);
